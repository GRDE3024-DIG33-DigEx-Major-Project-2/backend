/**
 * Endpoint functions for event-related tasks
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const constantsUtil = require("../util/constants.util");
const { db } = require("../db/models/db");
const authUtil = require("../util/auth.util");
const s3Util = require("../util/s3.util");
const { Sequelize, Op } = require("sequelize");
//Defined models in Sequelize instance
const { Event, EventImage, FavouritedBy, Tag, Act, TicketType } = db.models;
//Db create event handler
const CreateEventHandler = require("../db/handlers/events/create.handler");
//Db update event handler
const UpdateEventHandler = require("../db/handlers/events/update.handler");
//Db get event handler
const GetEventHandler = require("../db/handlers/events/get.handler");
//Db delete event handler
const DeleteEventHandler = require("../db/handlers/events/delete.handler");

class EventController {
  /**
   * Create a new event
   * @param {*} req
   * @param {*} res
   */
  Create = async (req, res) => {
    console.clear();
    console.log("BEGIN CREATE");
    //User data from access token
    let tokenData = req.user;
    //S3 filename of image, excluding the extension
    let eventImgFilename = "";

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
          tokenData.user,
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
    //User data from access token
    let tokenData = req.user;
    //S3 filename of image, excluding the extension
    let eventImgFilename = "";


    let count = 0;


    console.log(count++);

    //Updated Event-related tables
    try {
      const result = await db.transaction(async (t) => {

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
        await EventImage.findOne({
          where: {
            EventId: req.body.event.id,
          },
          transaction: t,
        })
          //Delete old event image if found
          .then(async (oldEventImg) => {
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
    console.log(count++);
    //Remove image without replacement
    try {
      await EventImage.findOne({
        where: {
          EventId: req.body.event.id,
        },
        transaction: t,
      })
        //Delete old event image and db row if found
        .then(async (oldEventImg) => {
          if (oldEventImg != null && req.body.eventImg == null) {
            console.log("old event image exists!");
            console.log("Flagged for event image removal");
            //Delete from db
            await EventImage.destroy({
              where: { id: oldEventImg.dataValues.id },
              transaction: t,
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
    console.log(count++);
        const eventData = await UpdateEventHandler.Update(
          req.body,
          eventImgFilename,
          tokenData.user,
          t,
        );

        //If EventImg exists and wasn't updated, find and assign it to response data
        if (eventData.eventImg == null) {
          console.log(count++);
          await EventImage.findOne({
            where: { EventId: req.body.event.id },
            transaction: t,
          }).then(async (result) => {
            eventData.eventImg = result;
          });
        }
        console.log("SENDING BACK UPDATE");
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
    console.log("Getting event");
    try {
      const result = await db.transaction(async (t) => {
        await GetEventHandler.FindOneById(eventId, res, t).then((data) => {
          console.log("processing data");
          console.log(data);
          //Found event
          if (data != null) {
            event = data;
          }
          //No event with that id found
          else {
            res.status(400).json({
              msg: "The event with that id doesn't exist",
            });
          }
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
    //User data from access token
    let tokenData = req.user.user;

    //Not an Event-associated id -- send 400 error response
    if ((await Event.findByPk(req.body.eventId)) == null)
      return res
        .status(400)
        .json({ msg: "Event ID is not associated with an Event" });

    //Look for existing favourite association
    await FavouritedBy.findOne({
      where: { AttendeeId: tokenData.id, EventId: req.body.eventId },
    }).then(async (junction) => {
      console.log("INSIDE AWAIT: " + junction);
      //Not favourited, therefore add new junction
      if (junction == null) {
        let result = await FavouritedBy.create({
          EventId: req.body.eventId,
          AttendeeId: tokenData.id,
        });
        console.log("Favourited event: ", result);
        //Send back 200 status after creating junction
        return res.status(200).json({ msg: "Favourited event" });
      }
      //Favourited, therefore remove associated junction
      else {
        let result = await FavouritedBy.destroy({ where: { id: junction.id } });
        console.log("Unfavourited event: ", result);
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
    //User data from access token
    let tokenData = req.user;

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
            AttendeeId: tokenData.user.id,
          },
          transaction: t,
        }).then((result) => {
          //Divide number of rows by the page limit
          numPages = Math.ceil(result / limit);
        });

        //Find page of attendee-event junctions
        await FavouritedBy.findAll({
          where: {
            AttendeeId: tokenData.user.id,
          },
          transaction: t,
          offset: offset,
          limit: limit,
          order: [
            [
              constantsUtil.DEFAULT_ORDERBY.FIELD,
              constantsUtil.DEFAULT_ORDERBY.DIRECTION,
            ],
          ],
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
    //User data from access token
    let tokenData = req.user.user;

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
            OrganizerId: tokenData.id,
          },
          transaction: t,
        }).then((result) => {
          //Divide number of rows by the page limit
          numPages = Math.ceil(result / limit);
        });

        //Find page of owned events event rows
        await Event.findAll({
          where: {
            OrganizerId: tokenData.id,
          },
          transaction: t,
          offset: offset,
          limit: limit,
          order: [
            [
              constantsUtil.DEFAULT_ORDERBY.FIELD,
              constantsUtil.DEFAULT_ORDERBY.DIRECTION,
            ],
          ],
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
    //Number of pages that meet the search criteria
    let numPages = 0;
    //Array of owned events for page
    let data = [];
    //The limit of events to return
    let limit = constantsUtil.PAGE_LIMIT;
    //Which page of events to retrieve
    let offset = req.body.page * limit;
    //Number of events
    let rowCount = 0;
    //Events to return in response
    let events;

    //Default min-max event dates
    const currYear = new Date().getFullYear();
    const maxYear = currYear + 100;
    const maxDate = new Date(maxYear, 0, 1, 0, 0, 0);
    const minDate = "1950-01-01 00:00:00";

    console.log("DATE RANGE TEST");
    console.log(req.body.minDate);
    console.log(req.body.maxDate);

    //Keyword sanitizer
    let kw = null;
    if (
      req.body.keywords &&
      req.body.keywords != null &&
      req.body.keywords != "" &&
      typeof req.body.keywords === "String"
    ) {
      console.log("Creating keywords string");
      kw = req.body.keywords.toLowerCase();
    }

    //Price range sanitizer
    let priceRange = null;
    if (req.body.priceRange != null) {
      if (
        req.body.priceRange.minPrice != null &&
        req.body.priceRange.maxPrice != null &&
        req.body.priceRange.minPrice != 0 &&
        req.body.priceRange.maxPrice != 0
      ) {
        priceRange = req.body.priceRange;
      }
    }

    //Filter options for searching events through sequelize
    let filterOptions = {
      //The tags to filter events by -- If defined, assign request content, else empty array
      tags: req.body.tags ? req.body.tags : [],
      //The keywords to filter events by -- If defined and doesn't equal null, assign request content to lower case, else empty array
      keywords: kw,
      //Set the start date to filter events by
      startDate: req.body.startDate
        ? req.body.startDate
        : "1950-01-01 00:00:00",
      //Minimum date for event results
      minDate: req.body.minDate ? req.body.minDate : minDate,
      //Maximum date for event results
      maxDate: req.body.maxDate ? req.body.maxDate : maxDate,
      //The price range for the event tickets -- If defined, assign request content, else null
      priceRange: priceRange,
      //Set up for matching the city -- If defined and doesn't equal null, assign request content, else array of all cities
      cities:
        req.body.city && req.body.city != null
          ? [req.body.city]
          : constantsUtil.CITIES,
    };

    console.log("PRICE RANGE TEST");
    console.log(filterOptions.priceRange);

    // console.log("DATE TEST");
    // console.log(filterOptions.minDate);
    // console.log(filterOptions.maxDate);

    //Set priceRange to null if maxPrice is 0
    if (filterOptions.priceRange != null)
      if (filterOptions.priceRange)
        if (req.body.priceRange.maxPrice != null)
          if (req.body.priceRange.maxPrice <= 0)
            filterOptions.priceRange = null;

    let tagWhere = {
      //Has association with all tags
      id: filterOptions.tags,
    };

    //Act table conditions
    let countActIncludes = {
      model: Act,
      as: "Acts",
    };
    let findActIncludes = {
      model: Act,
      as: "Acts",
    };

    //Search criteria for counting events
    let countConditions = {
      where: {},
      include: [countActIncludes],
      group: `${Event.tableName}.${Event.primaryKeyAttribute}`,
      having: null,
      transaction: null,
      logging: console.log,
      subQuery: false,
    };

    //Search criteria for finding page of events
    let findConditions = {
      where: {},
      subQuery: false,
      include: [findActIncludes],
      group: [
        `${Event.tableName}.${Event.primaryKeyAttribute}`,
        "Acts->EventAct.id",
        "Acts.id",
      ],
      having: null,
      transaction: null,
      logging: console.log,
      limit: limit,
      offset: offset,
      order: [
        [
          constantsUtil.DEFAULT_ORDERBY.FIELD,
          constantsUtil.DEFAULT_ORDERBY.DIRECTION,
        ],
      ],
    };

    //No keyword filter
    if (kw == null) {
      countConditions.where = {
        [Op.and]: [
          {
            //Occuring earliest on the minDate specified
            startDate: {
              [Op.gte]: filterOptions.minDate,
            },
            //Occuring latest on the maxDate specified
            endDate: {
              [Op.lte]: filterOptions.maxDate,
            },
          },
          {
            //Is in one of the specified cities
            city: {
              [Op.or]: filterOptions.cities,
            },
          },
        ],
      };
      findConditions.where = {
        [Op.and]: [
          {
            //Occuring earliest on the minDate specified
            startDate: {
              [Op.gte]: filterOptions.minDate,
            },
            //Occuring latest on the maxDate specified
            endDate: {
              [Op.lte]: filterOptions.maxDate,
            },
          },
          {
            //Is in one of the specified cities
            city: {
              [Op.or]: filterOptions.cities,
            },
          },
        ],
      };
    }
    //Has keyword filter
    else {
      console.log("SETTING KEYWORDS FILTER");
      countConditions.where = {
        [Op.or]: [
          {
            [Op.and]: [
              {
                //Keyword match found in Event title
                title: {
                  [Sequelize.Op.iLike]: "%" + filterOptions.keywords + "%",
                },
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
                //Is in one of the specified cities
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                //Keyword match found in Event venue
                venueName: {
                  [Sequelize.Op.iLike]: "%" + filterOptions.keywords + "%",
                },
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
                //Is in one of the specified cities
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
          {
            [Op.and]: [
              //Keyword match found in Act name
              {
                "$Acts.name$": {
                  [Sequelize.Op.iLike]: `%${filterOptions.keywords}%`,
                },
              },
              //Starting on this state specified
              {
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
              },
              //Is in one of the specified cities
              {
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
        ],
      };

      findConditions.where = {
        [Op.or]: [
          {
            [Op.and]: [
              {
                //Keyword match found in Event title
                title: { [Sequelize.Op.iLike]: `%${filterOptions.keywords}%` },
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
                //Is in one of the specified cities
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                //Keyword match found in Event venue
                venueName: {
                  [Sequelize.Op.iLike]: `%${filterOptions.keywords}%`,
                },
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
                //Is in one of the specified cities
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
          {
            [Op.and]: [
              //Keyword match found in Act name
              {
                "$Acts.name$": {
                  [Sequelize.Op.iLike]: `%${filterOptions.keywords}%`,
                },
              },
              //Starting on this state specified
              {
                //Occuring earliest on the minDate specified
                startDate: {
                  [Op.gte]: filterOptions.minDate,
                },
                //Occuring latest on the maxDate specified
                endDate: {
                  [Op.lte]: filterOptions.maxDate,
                },
              },
              //Is in one of the specified cities
              {
                city: {
                  [Op.or]: filterOptions.cities,
                },
              },
            ],
          },
        ],
      };
    }

    //Has tag filter
    if (filterOptions.tags.length > 0) {
      countConditions.having = Sequelize.literal(
        `COUNT(DISTINCT 'Tags.id') >= 1`,
      );
      //Tag table conditions
      countConditions.include.push({
        model: Tag,
        where: tagWhere,
      });

      findConditions.having = Sequelize.literal(
        `COUNT(DISTINCT 'Tags.id') >= 1`,
      );
      //Tag table conditions
      findConditions.include.push({
        model: Tag,
        where: tagWhere,
      });
      findConditions.group.push("Tags.id");
      findConditions.group.push("Tags->TaggedWith.id");
    }

    //Has ticket price filter
    if (
      filterOptions.priceRange != null &&
      filterOptions.priceRange.minPrice &&
      filterOptions.priceRange.maxPrice
    )
      if (filterOptions.priceRange.maxPrice > 0) {
        console.log("ADDING TICKET PRICE FILTER");
        //TicketType table conditions
        countConditions.include.push({
          model: TicketType,
          where: {
            price: {
              [Op.between]: [
                filterOptions.priceRange.minPrice,
                filterOptions.priceRange.maxPrice,
              ],
            },
          },
        });
        //TicketType table conditions
        findConditions.include.push({
          model: TicketType,
          where: {
            price: {
              [Op.between]: [
                filterOptions.priceRange.minPrice,
                filterOptions.priceRange.maxPrice,
              ],
            },
          },
        });

        findConditions.group.push("TicketTypes.id");
        findConditions.group.push("TicketTypes->EventTicket.id");
      }

    try {
      const result = await db.transaction(async (t) => {
        //Set transaction instance for conditions
        countConditions.transaction = t;
        findConditions.transaction = t;

        console.log("BEGINNING EVENT COUNT SEARCH");

        //Count number of Events in db that match the filter options
        rowCount = await Event.count(countConditions).catch((err) => {
          console.error("An error occured while counting events:", err);
          throw err;
        });
        //Matches found, calculate the number of pages
        if (rowCount.length > 0) {
          console.log("Row Count: " + rowCount[0].count);
          //Divide number of rows by the page limit
          numPages = Math.ceil(rowCount.length / limit);
        } else {
          console.log("No Rows Found");
        }

        console.log("BEGINNING EVENT PAGE SEARCH");
        //Find all events that match the filter criteria
        events = await Event.findAll(findConditions).catch((err) => {
          console.error("An error occured while finding events: ", err);
          throw err;
        });

        console.log("FINISHED BOTH QUERIES");
        console.log("Number of Events Found: " + events);

        //Events that are filtered by tag criteria
        let filteredData;

        //Filter out the non-tag matches
        if (events.tags && filterOptions.tags.length > 0) {
          filteredData = events.filter(
            (event) => event.tags.length === filterOptions.tags.length,
          );
          console.log(filteredData);

          //Retrieve all table data for each of the found events
          for (let ev of filteredData) {
            let val = await GetEventHandler.FindOneById(
              ev.dataValues.id,
              res,
              t,
            );
            data.push(val);
          }
        } else {
          //Retrieve all table data for each of the found events
          for (let ev of events) {
            let val = await GetEventHandler.FindOneById(
              ev.dataValues.id,
              res,
              t,
            );
            data.push(val);
          }
        }

        console.log("Request Body: ", req.body);
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
    //User data from access token
    let tokenData = req.user;
    console.log("Finding event to delete");
    //Verify that the user owns the Event requesting deletion
    let event = await Event.findByPk(eventId);
    if (event.dataValues.OrganizerId != tokenData.user.id) {
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
