/**
 * Endpoint functions for event-related tasks
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const constantsUtil = require("../util/constants.util");
const { db } = require("../db/models/db");
const authUtil = require("../util/auth.util");
const s3Util = require("../util/s3.util");
const sharp = require("sharp");
const path = require("path");
const { UUIDV4 } = require("sequelize");
//Defined models in Sequelize instance
const {
    Act,
    Event,
    EventImage,
    TicketType,
    EventTicket,
    TaggedWith,
    EventAct,
    FavouritedBy,
    Tag
} = db.models;
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
        //Decoded access token data
        let decodedToken;
        //S3 filename of image, excluding the extension
        let eventImgFilename = "";
        //If body is empty, send 400 response
        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                msg: "Request body is empty!"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Prevent non-organizers from creating events
        if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
            const msg = "Only Organizers may create events";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }
        //Upload event image
        if (req.file && req.file.buffer) {
            eventImgFilename = s3Util.generateUniqueFilename(req.body.filename);
            try {
                await s3Util
                    .uploadEventImg(
                        eventImgFilename,
                        req.file.buffer,
                        constantsUtil.IMG_MIMETYPE
                    );
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    message: "Image upload failed"
                });
            }
        }
        //Create Event-related tables
        try {
            const result = await db.transaction(async (t) => {
                const eventData = await CreateEventHandler.Create(req.body, eventImgFilename, decodedToken.user, t);
                //Send back 201 status wih the newly created event instance
                return res.status(201).json(eventData);
            });
        }
        catch (err) {
            //Delete file from S3 if it was uploaded in this instance
            if (eventImgFilename != "")
                s3Util.deleteEventImage(eventImgFilename);
            const msg = "Failed to create all event-related tables";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }
    }


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
                msg: "Request body is empty!"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Prevent non-organizers from updating events
        if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
            const msg = "Only Organizers may create events";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }
        //Upload event image
        if (req.file && req.file.buffer) {
            eventImgFilename = s3Util.generateUniqueFilename(req.body.filename);
            try {
                //Upload new image
                eventImgFilename = await s3Util
                    .uploadEventImg(
                        eventImgFilename,
                        req.file.buffer,
                        constantsUtil.IMG_MIMETYPE
                    );

                //Search for an old event image
                EventImage.findOne({
                    where: {
                        EventId: req.body.event.id
                    }
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
                    message: "Image upload failed"
                });
            }
        }

        //Remove image without replacement
        try {

            EventImage.findOne({
                where: {
                    EventId: req.body.event.id
                }
            })
                //Delete old event image and db row if found
                .then(async (oldEventImg) => {
                    if (oldEventImg != null && req.body.eventImg == null) {
                        console.log("old event image exists!");
                            console.log("Flagged for event image removal");
                            //Delete from db
                            await EventImage.destroy({where: {id: oldEventImg.dataValues.id}});
                            //Delete image from s3 bucket
                            s3Util.deleteEventImage(oldEventImg.dataValues.filename);
                    }
                });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Image removal failed"
            });
        }


        //Updated Event-related tables
        try {
            const result = await db.transaction(async (t) => {
                const eventData = await UpdateEventHandler.Update(req.body, eventImgFilename, decodedToken.user, t);
                console.log("Event updated!");
                //Send back 200 status wih the newly updated object
                return res.status(200).json(eventData);
            });
        }
        catch (err) {
            //Delete file from S3 if it was uploaded in this instance
            if (eventImgFilename != "")
                s3Util.deleteEventImage(eventImgFilename);
            const msg = "Failed to update all event-related tables";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }
    }


    /**
     * Get event by event id
     * @param {any} req
     * @param {any} res
     */
    GetById = async (req, res) => {
        let eventId = req.params.id;
        let data = await GetEventHandler.FindOneById(eventId, res);
        //Send back 200 status with the retrieved event and related tables
        return res.status(201).json(data);
    }

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
                msg: "Request body is empty!"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Prevent non-attendees from favouriting events
        if (decodedToken.user.userType != enumUtil.userTypes.attendee) {
            const msg = "Only Attendees may favourite events";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }

        //Look for existing favourite association
        await FavouritedBy.findOne({ where: { AttendeeId: decodedToken.user.id, EventId: req.body.eventId } })
            .then(async (junction) => {
                //Not favourited, therefore add new junction
                if (junction == null) {
                    let result = await FavouritedBy.create({
                        EventId: req.body.eventId,
                        AttendeeId: decodedToken.user.id
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
            })


    }


    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
    /**
     * Get filtered page of event favourites for an Attendee
     * @param {*} req 
     * @param {*} res 
     */
    GetFavourites = async (req, res) => {
        console.log("INSIDE FAVOURITES");
        //Decoded access token data
        let decodedToken;
        //If body is empty, send 400 response
        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                msg: "Request body is empty!"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Only attendees have a favourites list
        if (decodedToken.user.userType != enumUtil.userTypes.attendee) {
            const msg = "Only attendees have a favourites list";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }

        //FIND TAG JUNCTIONS FOR EACH TAG IN REQ.BODY.TAGS


        let limit = 10;
        let offset = req.body.offset * limit;
        console.log("USER ID TEST");
        console.log(decodedToken.user.id);


        //Find page of attendee-event junctions
        await FavouritedBy.findAll(
            {
                where: {
                    AttendeeId: decodedToken.user.id
                },
                offset: offset,
                limit: limit,
                order: [["createdAt", "ASC"]],
            })
            //Find all data associated with the events across all tables
            .then(async (junctions) => {
                console.log("Found favourited events");
                console.log(junctions);
                let data = [];
                for (let junc of junctions) {
                    let val = await GetEventHandler.FindOneById(junc.dataValues.EventId, res);
                    data.push(val);
                }
                //Return the event data array
                return res.status(200).json(data);
            })
            .catch((err) => {
                const msg = "Failed to get favourited events";
                console.log(msg, err);
                res.status(500).json({
                    msg: msg,
                    error: err
                });
            });

    }

    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
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
                msg: "Request body is empty!"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Only Organizers have owned events
        if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
            const msg = "Only Organizers have owned events";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }

        //FIND TAG JUNCTIONS FOR EACH TAG IN REQ.BODY.TAGS


        let limit = 10;
        let offset = req.body.offset * limit;


        //Find page of owned events event rows
        await Event.findAll(
            {
                where: {
                    OrganizerId: decodedToken.user.id
                },
                offset: offset,
                limit: limit,
                order: [["createdAt", "ASC"]],
            })
            //Find all data associated with the events across all tables
            .then(async (events) => {
                console.log("Found owned events");
                console.log(events);
                let data = [];
                for (let ev of events) {
                    let val = await GetEventHandler.FindOneById(ev.dataValues.id, res);
                    data.push(val);
                }
                //Return the event data array
                return res.status(200).json(data);
            })
            .catch((err) => {
                const msg = "Failed to get owned events";
                console.log(msg, err);
                res.status(500).json({
                    msg: msg,
                    error: err
                });
            });


    }

    //TODO IMPROVE/CHANGE INTO SEARCH FOR EVENTS
    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
    /**
     * Get list of events via search
     * @param {*} req 
     * @param {*} res 
     */
    SearchEvents = async (req, res) => {

        //If body is empty, send 400 response
        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                msg: "Request body is empty!"
            });
        }

        //FIND TAG JUNCTIONS FOR EACH TAG IN REQ.BODY.TAGS


        let limit = 10;
        let offset = req.body.offset * limit;


        await Event.findAll(
            {
                where: {

                },
                offset: offset,
                limit: limit,
                order: [["createdAt", "ASC"]],
            })
            .then(async (events) => {
                console.log("EVENTS");
                console.log(events);
                let data = [];
                for (let ev of events) {
                    let val = await GetEventHandler.FindOneById(ev.dataValues.id, res);
                    console.log("VAL");
                    console.log(val);
                    data.push(val);
                }

                return res.status(200).json(data);
            })
            .catch((err) => {
                const msg = "Failed to get events";
                console.log(msg, err);
                res.status(500).json({
                    msg: msg,
                    error: err
                });
            });
    }

    /**
     * Get all event tags
     * @param {*} req 
     * @param {*} res 
     */
    GetAllTags = async (req, res) => {
        Tag.findAll()
            .then((tags) => {
                return res.status(200).json({
                    tags: tags
                });
            })
            .catch((err) => {
                const msg = "Failed to get all tags";
                console.log(msg, err);
                res.status(500).json({
                    msg: msg,
                    error: err
                });
            });
    }



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
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Prevent non-organizers from deleting events
        if (decodedToken.user.userType != enumUtil.userTypes.organizer) {
            const msg = "Only Organizers may delete events";
            console.log(msg);
            return res.status(403).json({
                msg: msg
            });
        }

        //Verify that the user owns the Event requesting deletion
        let event = await Event.findByPk(eventId);
        if (event.dataValues.OrganizerId != decodedToken.user.id) {
            const msg = "Organizer is not associated with the Event specified";
            console.log(msg);
            return res.status(403).json({
                msg: msg
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
        }
        catch (err) {
            const msg = "Failed to delete all event-related tables";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }






    }


}

//Export the event controller
module.exports = EventController;