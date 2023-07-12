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



class EventController {


    /**
     * Create a new event
     * @param {*} req 
     * @param {*} res 
     */
    Create = async (req, res) => {

        //Increase request timeout
        //req.connection.setTimeout(100000); //100 seconds

        let decodedToken;
        let event;
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


        //Resize and upload event image
        if (req.file && req.file.buffer) {
            eventImgFilename = Date.now() + Math.random().toString(24).slice(2, 12) + path.extname(req.body.filename);
            //Resize image and save to S3 bucket
            try {
                let imgBuffer = await sharp(req.file.buffer)
                    //.resize(320, 320)
                    // .resize({
                    //     fit: sharp.fit.contain,
                    //     width: 600
                    // })                
                    .withMetadata()
                    .toBuffer();
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


    /**
     * Get all event tags
     * @param {*} req 
     * @param {*} res 
     */
    GetTags = async (req, res) => {

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
     * Get event by event id
     * @param {any} req
     * @param {any} res
     */
    GetById = async (req, res) => {

        let eventId = req.params.id;

        let data = await this.FindEvent(eventId, res);
                        //Send back 200 status with the retrieved event and related tables
                        return res.status(201).json(data);
    }






    /**
     * Find event-related tables for an event by event id
     * @param {any} eventId
     * @param {any} res
     */
    async FindEvent(eventId, res) {

        let data = {
            event: null,
            tags: [],
            acts: [],
            ticketTypes: [],
            eventImg: null
        }

        //Get all event-related rows
        try {
            const result = await db.transaction(async (t) => {
                //Find event
                await Event.findByPk(eventId)
                    .then(async (event) => {
                        //Event not found
                        if (event == null) {
                            const msg = "Failed to find event";
                            console.log(msg);
                            res.status(500).json({
                                msg: msg,
                            });
                        }
                        data.event = event.dataValues;
                        console.log("FOUND EVENT");

                        //Find event image
                        await EventImage.findOne({ where: { EventId: eventId } })
                            .then((eventImg) => {
                                //Event Image found
                                if (eventImg != null) {
                                    data.eventImg = eventImg.dataValues;
                                    console.log("FOUND EVENT IMG");
                                }
                                else {
                                    console.log("No event image found");
                                }
                            });

                        //Find taggedwith junctions
                        await TaggedWith.findAll({ where: { EventId: eventId } })
                            .then(async (taggedWithArr) => {
                                //Get tags from TaggedWith junction rows
                                if (taggedWithArr != null) {
                                    //Find tags
                                    for (let row of taggedWithArr) {
                                        await Tag.findOne({
                                            where: {
                                                id: row.dataValues.TagId
                                            }
                                        })
                                            .then((tag) => {
                                                data.tags.push(tag.dataValues);
                                                console.log(data.tags);
                                            });
                                    }
                                }
                                else {
                                    console.log("No tag associations found for event");
                                }
                            });

                        //Find EventAct junctions
                        await EventAct.findAll({ where: { EventId: eventId } })
                            .then(async (eventActs) => {
                                //Get acts from EventAct junction rows
                                if (eventActs != null) {
                                    //Find acts
                                    for (let row of eventActs)
                                        await Act.findOne({
                                            where: {
                                                id: row.dataValues.ActId
                                            }
                                        })
                                            .then((act) => {
                                                data.acts.push(act.dataValues);
                                            })
                                }
                                else {
                                    console.log("No act associations found for event");
                                }
                            });

                        //Find EventTicket junctions
                        await EventTicket.findAll({ where: { EventId: eventId } })
                            .then(async (eventTickets) => {
                                //Get ticketType from EventTicket junction rows
                                if (eventTickets != null) {
                                    //Find ticket types
                                    for (let row of eventTickets)
                                        await TicketType.findOne({
                                            where: {
                                                id: row.dataValues.TicketTypeId
                                            }
                                        })
                                            .then((ticketType) => {
                                                data.ticketTypes.push(ticketType.dataValues);
                                            })
                                }
                                else {
                                    console.log("No ticket type associations found for event");
                                }
                            });
                    })
                    //Return successful response
                    .then(() => {
                        console.log("Event retrieved!");
                        console.log(data);
                    })
            });
        }
        catch (err) {
            const msg = "Failed to find event-related tables by id";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }
        //Return event obj
        return data;
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
            //Create the junction
            let junction = await EventAct.create({
                ActId: actObj.id,
                EventId: eventId
            }, { transaction: transaction });
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
            //Create the junction
            let junction = await EventTicket.create({
                TicketTypeId: ticketType.id,
                EventId: eventId
            }, { transaction: transaction });
        }
    }


    /**
     * Add EventImage row to table
     * @param {*} eventImgFilename 
     * @param {*} eventId 
     * @param {*} res 
     * @param {*} transaction 
     */
    async CreateEventImage(eventImgFilename, eventId, res, transaction) {
        let eventImage = await EventImage.create({
            filename: eventImgFilename,
            EventId: eventId,
        }, { transaction: transaction });
    }



}

//Export the event controller
module.exports = EventController;