/**
 * Endpoint functions for event-related tasks
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const { db } = require("../db/models/db");
const jwt = require('jsonwebtoken');
//Load required db models for querying
//Defined models in Sequelize instance
const {
    Organizer,
    Attendee,
    Act,
    Article,
    Blog,
    Event,
    ArticleImage,
    EventImage,
    Performer,
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
        //console.log(token === String);
        let organizerId;

        try {
            //Verify JWT
            jwt.verify(token, process.env.JWTSECRET, (err, tokenData) => {
                if (err) {
                    //Token invalid, send 403 response    
                    return res.status(403).json({
                        err: "Forbidden"
                    });
                } else {
                    //Token is valid, assign token data to a variable
                    organizerId = tokenData.id;
                    console.log("validated");
                    console.log(organizerId);
                }
            });
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

        //TODO
        //use JWT for id

        let event = null;

        //Create an Event
        console.log("Init Event");
        event = await Event.create({
            OrganizerId: organizerId,
            title: req.body.event.title,
            venueName: req.body.event.venueName,
            description: req.body.event.description,
            summary: req.body.event.summary,
            startDate: req.body.event.startDate,
            endDate: req.body.event.endDate,
            address: req.body.event.address,
            city: req.body.event.city,
            region: req.body.event.region,
            postcode: req.body.event.postcode,
            country: req.body.event.country,
            isFree: req.body.event.isFree,
            purchaseUrl: req.body.event.purchaseUrl,
        })
            .catch((reason) => {
                let msg = "Problem creating Event";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });

        console.log("Init Tags");
        //Create tag junctions
        for (let tag of req.body.tags) {
            let junction = await TaggedWith.create({
                EventId: event.id,
                TagId: tag.id
            })
                .catch((reason) => {
                    let msg = "Problem creating Event Tag Junction";
                    console.log(msg);
                    console.log(reason);
                    return res.status(400).json({
                        msg: msg,
                        error: reason
                    });
                });
        }


        console.log("Init Acts");
        //Create each ticket and event-ticket junction
        for (let act of req.body.acts) {
            //Create the ticket type
            let actObj = await Act.create({
                name: act.name
            })
                .catch((reason) => {
                    let msg = "Problem creating Act";
                    console.log(msg);
                    console.log(reason);
                    return res.status(400).json({
                        msg: msg,
                        error: reason
                    });
                });
            //Create the junction
            let junction = await EventAct.create({
                ActId: act.id,
                EventId: event.id
            })
                .catch((reason) => {
                    let msg = "Problem creating Event Act Junction";
                    console.log(msg);
                    console.log(reason);
                    return res.status(400).json({
                        msg: msg,
                        error: reason
                    });
                });
        }

        console.log("Init Ticket Types");
        //Create each ticket and event-ticket junction
        for (let tier of req.body.ticketTypes) {
            //Create the ticket type
            let ticketType = await TicketType.create({
                name: tier.name,
                price: tier.price
            })
                .catch((reason) => {
                    let msg = "Problem creating Ticket Type";
                    console.log(msg);
                    console.log(reason);
                    return res.status(400).json({
                        msg: msg,
                        error: reason
                    });
                });
            //Create the junction
            let junction = await EventTicket.create({
                TicketTypeId: tier.id,
                EventId: event.id
            })
                .catch((reason) => {
                    let msg = "Problem creating Event Ticket Junction";
                    console.log(msg);
                    console.log(reason);
                    return res.status(400).json({
                        msg: msg,
                        error: reason
                    });
                });
        }










        console.log("User created!");
        console.log(event.toJSON());


        //Send back 201 status wih the newly created user instance
        return res.status(201).json(event);

    }



}

//Export the event controller
module.exports = EventController;