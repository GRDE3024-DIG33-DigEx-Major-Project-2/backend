/**
 * Get event db handler
 * 
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
const authUtil = require("../../../util/auth.util");
const s3Util = require("../../../util/s3.util");
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


class GetEventHandler {



	constructor() {

	}




    /**
     * Find event-related tables for an event by event id
     * @param {any} eventId
     * @param {any} res
     * @param {any} transaction
     */
    async FindOneById(eventId, res, transaction) {

        let data = {
            event: null,
            tags: [],
            acts: [],
            ticketTypes: [],
            eventImg: null
        }

        //Get all event-related rows
        try {
           // const result = await db.transaction(async (t) => {
                //Find event
                await Event.findOne({where: {id: eventId}, transaction: transaction})
                    .then(async (event) => {
                        //Event not found
                        if (event == null) {
                            const msg = "Failed to find event";
                            console.log(msg);
                            return res.status(500).json({
                                msg: msg,
                            });
                        }
                        data.event = event.dataValues;
                        console.log("FOUND EVENT");

                        //Find event image
                        await EventImage.findOne({ where: { EventId: eventId }, transaction: transaction })
                            .then(async (eventImg) => {
                                //Event Image found
                                if (eventImg != null) {
                                    data.eventImg =  eventImg.dataValues;
                                }
                                else {
                                    console.log("No event image found");
                                }
                            });

                        //Find taggedwith junctions
                        await TaggedWith.findAll({ where: { EventId: eventId }, transaction: transaction })
                            .then(async (taggedWithArr) => {
                                //Get tags from TaggedWith junction rows
                                if (taggedWithArr != null) {
                                    //Find tags
                                    for (let row of taggedWithArr) {
                                        await Tag.findOne({
                                            where: {
                                                id: row.dataValues.TagId
                                            }, transaction: transaction
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
                        await EventAct.findAll({ where: { EventId: eventId }, transaction: transaction })
                            .then(async (eventActs) => {
                                //Get acts from EventAct junction rows
                                if (eventActs != null) {
                                    //Find acts
                                    for (let row of eventActs)
                                        await Act.findOne({
                                            where: {
                                                id: row.dataValues.ActId
                                            }, transaction: transaction
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
                        await EventTicket.findAll({ where: { EventId: eventId }, transaction: transaction })
                            .then(async (eventTickets) => {
                                //Get ticketType from EventTicket junction rows
                                if (eventTickets != null) {
                                    //Find ticket types
                                    for (let row of eventTickets)
                                        await TicketType.findOne({
                                            where: {
                                                id: row.dataValues.TicketTypeId
                                            }, transaction: transaction
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
         //  });
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



    /**
     * Find Event table rows associated with the Organizer
     * @param {*} organizerId 
     * @param {*} t 
     * @returns Array of Event rows data
     */
    async FindOrganizerEvents(organizerId, t) {
        console.log("Finding Organizer events");
        //Array of event row data
        let arr = [];
        await Event.findAll({where: {OrganizerId:organizerId}, transaction: t})
        .then((events) => {
            console.log("Event search complete: " + events);
            //Add event row table to events array
            if (events != null)
                for (let event of events)
             if (event.dataValues) 
              arr.push(event.dataValues);                           
        });
        //Return event rows
        return arr;
    }



}


//Export handler
module.exports = new GetEventHandler();