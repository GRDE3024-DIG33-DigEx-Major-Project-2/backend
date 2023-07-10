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
//Load required db models for querying
//Defined models in Sequelize instance
const {
    Organizer,
    Attendee,
    Act,
    Event,
    EventImage,
    TicketType,
    EventTicket,
    TaggedWith,
    EventAct,
} = db.models;



class EventController {



    //req.body.event
    //req.body.acts[]
    //req.body.ticketTypes[]
    //req.body.tags[]
    /**
     * Create a new event
     * @param {*} req 
     * @param {*} res 
     */
    Create = async (req, res) => {


        let decodedToken;
        let event;
        let eventImgFilename = "";

        // console.log("creating event");
        // console.log(req.body);
        // console.log("EVENT LOG");
        // console.log(req.body.event);
        // console.log("ACTS LOG");
        // console.log(req.body.acts);
        // console.log("ACT INDEX LOG");
        // console.log(req.body.acts[0]);
        // console.log("TICKET TYPES LOG");
        // console.log(req.body.ticketTypes);
        // console.log("FILENAME LOG");
        // console.log(req.body.filename);

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
            //console.log("currUser");
            //console.log(decodedToken);
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


        //Resize and upload event image
        if (req.file && req.file.buffer) {
            eventImgFilename = Date.now() + Math.random().toString(24).slice(2, 12) + path.extname(req.body.filename);
            //Resize image and save to S3 bucket
            try {
                let imgBuffer = await sharp(req.file.buffer).resize(320, 320).withMetadata().toBuffer();
                //let imgBuffer = await sharp(req.file.buffer)
                // .resize({
                //     fit: sharp.fit.contain,
                //     width: 600
                // })
                //.withMetadata()
                //.toBuffer();
                console.log(imgBuffer);
                //Upload image to S3 bucket
                s3Util.upload(imgBuffer, eventImgFilename, req.file.mimetype);
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
            //Create an Event
            console.log("Init Event");
            event = await this.CreateEvent(req.body.event, decodedToken.user, res, t);
            //console.log(event);
            //Create Tag associations
            console.log("Init Tags");
            await this.CreateTaggedWith(req.body.tags, event.id, res, t);
            //Create Act associations
            console.log("Init Acts");
            await this.CreateActs(req.body.acts, event.id, res, t);
            //Create Ticket Type associations
            console.log("Init Ticket Types");
            await this.CreateTicketTypes(req.body.ticketTypes, event.id, res, t);
            //Create Event Image 
            if (eventImgFilename != "") {
            await this.CreateEventImage(eventImgFilename, event.id, res, t);
            }

            console.log("Event created!");
            //Send back 201 status wih the newly created user instance
            return res.status(201).json(event);            
            
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




    //TODO MOVE CRUD FUNCTIONS TO A DB SERVICE FILE
    /**
     * Add Event to Event table
     * @param {*} event 
     * @param {*} currUser 
     * @param {*} res 
     * @returns 
     */
    async CreateEvent(event, currUser, res, transaction) {
        //console.log(currUser);
        return await Event.create({
            OrganizerId: currUser.id,
            title: event.title,
            venueName: event.venueName,
            description: event.description,
            summary: event.summary,
            startDate: event.startDate,
            endDate: event.endDate,
            address: event.address,
            city: event.city,
            region: event.region,
            postcode: event.postcode,
            country: event.country,
            isFree: event.isFree,
            purchaseUrl: event.purchaseUrl,
            status: event.status | enumUtil.eventStatus.upcoming,
        }, { transaction: transaction });
            // .catch((reason) => {
            //     let msg = "Problem creating Event";
            //     console.log(msg);
            //     console.log(reason);
            //     return res.status(400).json({
            //         msg: msg,
            //         error: reason
            //     });
            // });
    }


    /**
     * Add Event-Tag junction rows
     * @param {*} tags 
     * @param {*} eventId 
     * @param {*} res 
     */
    async CreateTaggedWith(tags, eventId, res, transaction) {
        //Create tag junctions
        for (let tag of tags) {
            let junction = await TaggedWith.create({
                EventId: eventId,
                TagId: tag.id
            }, { transaction: transaction });
                // .catch((reason) => {
                //     let msg = "Problem creating Event Tag Junction";
                //     console.log(msg);
                //     console.log(reason);
                //     return res.status(400).json({
                //         msg: msg,
                //         error: reason
                //     });
                // });
            // console.log("Tag Junction created");
            // console.log(junction);
        }
    }


    /**
     * Add Acts to Act table
     * @param {*} tags 
     * @param {*} eventId 
     * @param {*} res 
     */
    async CreateActs(acts, eventId, res, transaction) {
        //Create each act and event-act junction
        for (let act of acts) {
            //Create the act
            let actObj = await Act.create({
                name: act.name
            }, { transaction: transaction });
                // .catch((reason) => {
                //     let msg = "Problem creating Act";
                //     console.log(msg);
                //     console.log(reason);
                //     return res.status(400).json({
                //         msg: msg,
                //         error: reason
                //     });
                // });

            // console.log("Act created");
            // console.log(actObj);

            //Create the junction
            let junction = await EventAct.create({
                ActId: actObj.id,
                EventId: eventId
            }, { transaction: transaction });
                // .catch((reason) => {
                //     let msg = "Problem creating Event Act Junction";
                //     console.log(msg);
                //     console.log(reason);
                //     return res.status(400).json({
                //         msg: msg,
                //         error: reason
                //     });
                // });

            //  console.log("Act Junction created");
            // console.log(junction);
        }
    }


    /**
     * Add Event-TicketType junction rows
     * @param {*} tags 
     * @param {*} eventId 
     * @param {*} res 
     */
    async CreateTicketTypes(ticketTypes, eventId, res, transaction) {
        //Create each ticket and event-ticket junction
        for (let tier of ticketTypes) {
            //Create the ticket type
            let ticketType = await TicketType.create({
                name: tier.name,
                price: tier.price
            }, { transaction: transaction });
                // .catch((reason) => {
                //     let msg = "Problem creating Ticket Type";
                //     console.log(msg);
                //     console.log(reason);
                //     return res.status(400).json({
                //         msg: msg,
                //         error: reason
                //     });
                // });
            //  console.log("Ticket Type created");
            //  console.log(ticketType);
            //Create the junction
            let junction = await EventTicket.create({
                TicketTypeId: ticketType.id,
                EventId: eventId
            }, { transaction: transaction });
                // .catch((reason) => {
                //     let msg = "Problem creating Event Ticket Junction";
                //     console.log(msg);
                //     console.log(reason);
                //     return res.status(400).json({
                //         msg: msg,
                //         error: reason
                //     });
                // });
            //  console.log("Event-TicketType junction created");
            // console.log(junction);
        }
    }


    async CreateEventImage(eventImgFilename, eventId, res, transaction) {

        let eventImage = await EventImage.create({
            filename:eventImgFilename,
            EventId:eventId,
        }, { transaction: transaction });
    }



}

//Export the event controller
module.exports = EventController;