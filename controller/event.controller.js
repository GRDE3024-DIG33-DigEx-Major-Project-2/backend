/**
 * Endpoint functions for event-related tasks
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const constantsUtil = require("../util/constants.util");
const { db } = require("../db/models/db");
const authUtil = require("../util/auth.util");
const s3Util = require("../util/s3.util");
//Defined models in Sequelize instance
const { Event, EventImage, FavouritedBy, Tag } = db.models;
//Db create event handler
const CreateEventHandler = require("../db/handlers/events/create.handler");
//Db update event handler
const UpdateEventHandler = require("../db/handlers/events/update.handler");
//Db get event handler
const GetEventHandler = require("../db/handlers/events/get.handler");
//Db delete event handler
const DeleteEventHandler = require("../db/handlers/events/delete.handler");
const { Sequelize } = require("sequelize");

class EventController {
  /**
   * Create a new event
   * @param {*} req
   * @param {*} res
   */
  Create = async (req, res) => {
    //Decoded access token data
    let decodedToken;
    //S3 filename of image, excluding the extension
    let eventImgFilename = "";
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      return res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Prevent non-organizers from creating events
    if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
      const msg = "Only Organizers may create events";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }
    //Upload event image
    if (req.file && req.file.buffer) {
      eventImgFilename = s3Util.generateUniqueFilename(req.body.filename);
      try {
        await s3Util.uploadEventImg(
          eventImgFilename,
          req.file.buffer,
          constantsUtil.IMG_EXT,
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          message: "Image upload failed",
        });
      }
    }
    //Create Event-related tables
    try {
      const result = await db.transaction(async (t) => {
        const eventData = await CreateEventHandler.Create(
          req.body,
          eventImgFilename,
          decodedToken.user,
          t,
        );
        //Send back 201 status wih the newly created event instance
        return res.status(201).json(eventData);
      });
    } catch (err) {
      //Delete file from S3 if it was uploaded in this instance
      if (eventImgFilename != "")
        s3Util.deleteEventImage(eventImgFilename).then((deleteResult) => {
          console.log("Event Image deleted");
          console.log(deleteResult);
        });
      const msg = "Failed to create all event-related tables";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };

  /**
   * Update event and event-related tables
   * @param {*} req
   * @param {*} res
   */
  Update = async (req, res) => {
    //Decoded access token data
    let decodedToken;
    //S3 filename of image, excluding the extension
    let eventImgFilename = "";
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Prevent non-organizers from updating events
    if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
      const msg = "Only Organizers may create events";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }
    //Upload event image
    if (req.file && req.file.buffer) {
      eventImgFilename = s3Util.generateUniqueFilename(req.body.filename);
      try {
        //Upload new image
        await s3Util.uploadEventImg(
          eventImgFilename,
          req.file.buffer,
          constantsUtil.IMG_EXT,
        );

        //Search for an old event image
        EventImage.findOne({
          where: {
            EventId: req.body.event.id,
          },
        })
          //Delete old event image if found
          .then((oldEventImg) => {
            if (oldEventImg != null) {
              console.log("old event image exists!");
              s3Util.deleteEventImage(oldEventImg.dataValues.filename);
            }
          });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          message: "Image upload failed",
        });
      }
    }

    //Remove image without replacement
    try {
      EventImage.findOne({
        where: {
          EventId: req.body.event.id,
        },
      })
        //Delete old event image and db row if found
        .then(async (oldEventImg) => {
          if (oldEventImg != null && req.body.eventImg == null) {
            console.log("old event image exists!");
            console.log("Flagged for event image removal");
            //Delete from db
            await EventImage.destroy({
              where: { id: oldEventImg.dataValues.id },
            });
            //Delete image from s3 bucket
            s3Util.deleteEventImage(oldEventImg.dataValues.filename);
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Image removal failed",
      });
    }

    //Updated Event-related tables
    try {
      const result = await db.transaction(async (t) => {
        const eventData = await UpdateEventHandler.Update(
          req.body,
          eventImgFilename,
          decodedToken.user,
          t,
        );

        //If EventImg exists and wasn't updated, find and assign it to response data
        if (eventData.eventImg == null) {
          await EventImage.findOne({
            where: { EventId: req.body.event.id },
            transaction: t,
          }).then(async (result) => {
            eventData.eventImg = result;
          });
        }

        //Send back 200 status wih the newly updated object
        return res.status(200).json(eventData);
      });
    } catch (err) {
      //Delete file from S3 if it was uploaded in this instance
      if (eventImgFilename != "") s3Util.deleteEventImage(eventImgFilename);
      const msg = "Failed to update all event-related tables";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };

  /**
   * Get event by event id
   * @param {any} req
   * @param {any} res
   */
  GetById = async (req, res) => {
    let eventId = req.params.id;
    let event;
    try {
      const result = await db.transaction(async (t) => {
        await GetEventHandler.FindOneById(eventId, res, t).then((data) => {
          event = data;
        });
      });
    } catch (err) {
      const msg = "Failed to find event by id";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Send back 200 status with the retrieved event and related tables
    return res.status(201).json(event);
  };

  /**
   * Toggle a favourite event for an Attendee
   * @param {*} req
   * @param {*} res
   */
  ToggleFavourite = async (req, res) => {
    //Decoded access token data
    let decodedToken;
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      return res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Prevent non-attendees from favouriting events
    if (decodedToken.user.userType != enumUtil.userTypes.attendee) {
      const msg = "Only Attendees may favourite events";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }

    //Look for existing favourite association
    await FavouritedBy.findOne({
      where: { AttendeeId: decodedToken.user.id, EventId: req.body.eventId },
    }).then(async (junction) => {
      //Not favourited, therefore add new junction
      if (junction == null) {
        let result = await FavouritedBy.create({
          EventId: req.body.eventId,
          AttendeeId: decodedToken.user.id,
        });
        console.log("Favourited event");
        console.log(result);
        //Send back 200 status after creating junction
        return res.status(200).json({ msg: "Favourited event" });
      }
      //Favourited, therefore remove associated junction
      else {
        let result = await FavouritedBy.destroy({ where: { id: junction.id } });
        console.log("Unfavourited event");
        console.log(result);
        //Send back 200 status after removing junction
        return res.status(200).json({ msg: "Unfavourited event" });
      }
    });
  };

  /**
   * Get filtered page of event favourites for an Attendee. Also finds number of pages
   * @param {*} req
   * @param {*} res
   */
  GetFavourites = async (req, res) => {
    //Decoded access token data
    let decodedToken;
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      return res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Only attendees have a favourites list
    if (decodedToken.user.userType != enumUtil.userTypes.attendee) {
      const msg = "Only attendees have a favourites list";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }

    //The limit of events to return
    let limit = constantsUtil.PAGE_LIMIT;
    //Which page of events to retrieve
    let offset = req.body.page * limit;
    //Number of pages that meet the search criteria
    let numPages = 0;
    //Array of favourited events for page
    let data = [];

    try {
      const result = await db.transaction(async (t) => {
        //Counts number of pages
        await FavouritedBy.count({
          where: {
            AttendeeId: decodedToken.user.id,
          },
          transaction: t,
        }).then((result) => {
          //Divide number of rows by the page limit
          numPages = Math.ceil(result / limit);
        });

        //Find page of attendee-event junctions
        await FavouritedBy.findAll({
          where: {
            AttendeeId: decodedToken.user.id,
          },
          transaction: t,
          offset: offset,
          limit: limit,
          order: [["createdAt", "ASC"]],
        })
          //Find all data associated with the events across all tables
          .then(async (junctions) => {
            console.log("Found favourited events");
            console.log(junctions);

            for (let junc of junctions) {
              let val = await GetEventHandler.FindOneById(
                junc.dataValues.EventId,
                res,
                t,
              );
              data.push(val);
            }
          });

        //Return 200 response with the event data array and page count
        return res.status(200).json({ events: data, pageCount: numPages });
      });
    } catch (err) {
      const msg = "Failed to find favourited events page";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };

  /**
   * Get filtered page of owned events for an Organizer
   * @param {*} req
   * @param {*} res
   */
  GetOwnedEvents = async (req, res) => {
    //Decoded access token data
    let decodedToken;
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      return res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Only Organizers have owned events
    if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
      const msg = "Only Organizers have owned events";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }

    //The limit of events to return
    let limit = constantsUtil.PAGE_LIMIT;
    //Which page of events to retrieve
    let offset = req.body.page * limit;
    //Number of pages that meet the search criteria
    let numPages = 0;
    //Array of owned events for page
    let data = [];

    try {
      const result = await db.transaction(async (t) => {
        //Counts number of pages
        await Event.count({
          where: {
            OrganizerId: decodedToken.user.id,
          },
          transaction: t,
        }).then((result) => {
          //Divide number of rows by the page limit
          numPages = Math.ceil(result / limit);
        });

        //Find page of owned events event rows
        await Event.findAll({
          where: {
            OrganizerId: decodedToken.user.id,
          },
          transaction: t,
          offset: offset,
          limit: limit,
          order: [["createdAt", "ASC"]],
        })
          //Find all data associated with the events across all tables
          .then(async (events) => {
            console.log("Found owned events");
            console.log(events);
            for (let ev of events) {
              let val = await GetEventHandler.FindOneById(
                ev.dataValues.id,
                res,
                t,
              );
              data.push(val);
            }
          });

        //Return 200 response with the event data array and page count
        return res.status(200).json({ events: data, pageCount: numPages });
      });
    } catch (err) {
      const msg = "Failed to find owned events page";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };

  /**
   * Get list of events via search
   * @param {*} req
   * @param {*} res
   */
  SearchEvents = async (req, res) => {
    //If body is empty, send 400 response
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        msg: "Request body is empty!",
      });
    }
    //Number of pages that meet the search criteria
    let numPages = 0;
    //Array of owned events for page
    let data = [];
    //The limit of events to return
    let limit = constantsUtil.PAGE_LIMIT;
    //Which page of events to retrieve
    let offset = req.body.page * limit;
    //The tags to filter events by
    let tags = [];
    if (req.body.tags) tags = req.body.tags;
    //Number of events
    let rowCount = 0;
    //Events to return in response
    let events;

    try {
      const result = await db.transaction(async (t) => {
        //If tags are being used to filter
        if (tags.length > 0) {
          //Count number of Events in db that match the filter options
          rowCount = await Event.count({
            include: [
              {
                model: Tag,
                where: { id: tags },
              },
            ],
            //Inner join Event and Tag tables through the junction table, then count rows
            group: `${Event.tableName}.${Event.primaryKeyAttribute}`,
            having: Sequelize.literal(
              `COUNT(DISTINCT "${Tag.tableName}s".id) = ${tags.length}`,
            ),
            transaction: t,
          }).catch((err) => {
            console.error("An error occured while counting events:", err);
            throw err;
          });
          //Matches found, calculate the number of pages
          if (rowCount.length > 0) {
            console.log(rowCount[0].count);
            //Divide number of rows by the page limit
            numPages = Math.ceil(rowCount[0].count / limit);
          }
        }
        //If no tags are being used to filter
        else {
          //Count number of Events in db that match the filter options
          rowCount = await Event.count({
            transaction: t,
          }).catch((err) => {
            console.error("An error occured while counting events:", err);
            throw err;
          });
          //Divide number of rows by the page limit
          if (rowCount > 0) numPages = Math.ceil(rowCount / limit);
        }

        //Find all events that include the tags specified
        if (tags.length > 0)
          events = await Event.findAll({
            include: [
              {
                model: Tag,
                where: { id: tags },
                through: { attributes: [] },
              },
            ],
            group: `${Event.tableName}.${Event.primaryKeyAttribute}`,
            having: Sequelize.literal(`COUNT(DISTINCT "id") = ${tags.length}`),
            //Orger by date created, ascending
            order: [["createdAt", "ASC"]],
            offset: offset,
            limit: limit,
            transaction: t,
          }).catch((err) => {
            console.error("An error occured while finding events: ", err);
            throw err;
          });
        //Find all events that match the filter options (with no tag filtering)
        else
          events = await Event.findAll({
            where: {},
            order: [["createdAt", "ASC"]],
            offset: offset,
            limit: limit,
            transaction: t,
          }).catch((err) => {
            console.error("An error occured while finding events: ", err);
            throw err;
          });

        for (let ev of events) {
          let val = await GetEventHandler.FindOneById(ev.dataValues.id, res, t);
          data.push(val);
        }

        console.log("Number Of Events for the page: ", data.length);
        console.log("Number of Total Events: ", rowCount);
        console.log("Number of Pages: ", numPages);
      });
    } catch (err) {
      const msg = "Failed to search events";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }

    //Return 200 response with the event data array and page count
    return res.status(200).json({ events: data, pageCount: numPages });
  };

  /**
   * Get all event tags
   * @param {*} req
   * @param {*} res
   */
  GetAllTags = async (req, res) => {
    Tag.findAll()
      .then((tags) => {
        return res.status(200).json({
          tags: tags,
        });
      })
      .catch((err) => {
        const msg = "Failed to get all tags";
        console.log(msg, err);
        res.status(500).json({
          msg: msg,
          error: err,
        });
      });
  };

  /**
   * Delete an event owned by the Organizer user
   * @param {*} req
   * @param {*} res
   */
  DeleteEvent = async (req, res) => {
    //The id of the event to delete
    let eventId = req.params.id;
    //Decoded access token data
    let decodedToken;
    //Deny if authorization header is empty
    if (req.headers.authorization === undefined) return res.sendStatus(403);
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    //Retrieve user data from access token
    try {
      decodedToken = authUtil.decodeJWT(token);
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      return res.status(500).json({
        msg: msg,
        error: err,
      });
    }
    //Prevent non-organizers from deleting events
    if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
      const msg = "Only Organizers may delete events";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }

    //Verify that the user owns the Event requesting deletion
    let event = await Event.findByPk(eventId);
    if (event.dataValues.OrganizerId != decodedToken.user.id) {
      const msg = "Organizer is not associated with the Event specified";
      console.log(msg);
      return res.status(403).json({
        msg: msg,
      });
    }

    //Delete Event-related tables and images
    try {
      const result = await db.transaction(async (t) => {
        const deleteResult = await DeleteEventHandler.Delete(eventId, t);

        //Delete profile image if it exists
        if (deleteResult.eventImgFilename != null)
          s3Util.deleteEventImage(deleteResult.eventImgFilename);

        //Send back 200 status once event has been deleted
        return res.status(200).json(deleteResult);
      });
    } catch (err) {
      const msg = "Failed to delete all event-related tables";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };
}

//Export the event controller
module.exports = EventController;
