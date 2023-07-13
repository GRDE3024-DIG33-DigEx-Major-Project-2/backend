/**
 * Endpoint functions for event-related tasks
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
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
    Tag
} = db.models;
//Import db CRUD handlers
const CreateEventHandler = require("../db/handlers/events/create.handler");
const UpdateEventHandler = require("../db/handlers/events/update.handler");
const GetEventHandler = require("../db/handlers/events/get.handler");
const constantsUtil = require("../util/constants.util");

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
                s3Util.deleteFile(eventImgFilename);
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
                s3Util.deleteFile(eventImgFilename);
            const msg = "Failed to create all event-related tables";
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

    }


    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
    /**
     * Get filtered page of event favourites for an Attendee
     * @param {*} req 
     * @param {*} res 
     */
    GetFavourites = async (req, res) => {

    }

    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
    /**
     * Get filtered page of owned events for an Organizer
     * @param {*} req 
     * @param {*} res 
     */
    GetOwnedEvents = async (req, res) => {

    }

    //TODO IMPROVE/CHANGE INTO SEARCH FOR EVENTS
    //NO SEARCH FILTERS WORK YET. JUST PAGINATION FOR NOW
    /**
     * Get list of events via search
     * @param {*} req 
     * @param {*} res 
     */
    SearchEvents = async (req, res) => {

        //CHECK IF BODY EXISTS

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
                    let val = await this.FindEvent(ev.dataValues.id, res);
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

    }


}

//Export the event controller
module.exports = EventController;