/**
 * Create event db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
const e = require("cors");
//Defined models in Sequelize instance
const {
  Act,
  Event,
  EventImage,
  TicketType,
  EventTicket,
  TaggedWith,
  EventAct,
  Tag,
} = db.models;

class CreateEventHandler {
  /**
   * Attempt to create event data in db
   * @returns Created event data, excluding junction table rows
   */
  async Create(data, eventImgFilename, currUser, t) {
    //Event-related tables to return in response
    let eventData = {
      event: null,
      eventImg: null,
      tags: [],
      acts: [],
      ticketTypes: [],
    };
    //Create an Event
    console.log("Init Event");
    eventData.event = await this.CreateEvent(data.event, currUser, t);
    //Create Event Image
    if (eventImgFilename != "") {
      console.log("Init Event Image");
      eventData.eventImg = await this.CreateEventImage(
        eventImgFilename,
        eventData.event.id,
        t,
      );
    }
    //Create Tag associations
    console.log("Init Tags");
    eventData.tags = await this.CreateTaggedWith(
      data.tags,
      eventData.event.id,
      t,
    );
    //Create Act associations
    console.log("Init Acts");
    eventData.acts = await this.CreateActs(data.acts, eventData.event.id, t);
    //Create Ticket Type associations
    console.log("Init Ticket Types");
    eventData.ticketTypes = await this.CreateTicketTypes(
      data.ticketTypes,
      eventData.event.id,
      t,
    );
    //Return the new event db data
    console.log("Event created!");
    return eventData;
  }

  /**
   * Add Event to Event table
   * @param {*} event
   * @param {*} currUser
   * @param {*} transaction
   * @returns {*} Event table row
   */
  async CreateEvent(event, currUser, transaction) {
    return await Event.create(
      {
        OrganizerId: currUser.id,
        title: event.title,
        venueName: event.venueName,
        description: event.description,
        summary: event.summary,
        startDate: event.startDate,
        endDate: event.endDate,
        suburb: event.suburb,
        address: event.address,
        city: event.city,
        region: "NSW",
        postcode: event.postcode,
        country: event.country,
        isFree: event.isFree,
        purchaseUrl: event.purchaseUrl,
        status: event.status | enumUtil.eventStatus.upcoming,
      },
      { transaction: transaction },
    );
  }

  /**
   * Add EventImage row to table
   * @param {*} eventImgFilename
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*} EventImage table row
   */
  async CreateEventImage(eventImgFilename, eventId, transaction) {
    return await EventImage.create(
      {
        filename: eventImgFilename,
        EventId: eventId,
      },
      { transaction: transaction },
    );
  }

  /**
   * Add Event-Tag junction rows
   * @param {*} tags
   * @param {*} eventId
   * @param {*} transaction
   * @returns {Array} Event-Tag junctions array
   */
  async CreateTaggedWith(tags, eventId, transaction) {
    //Array of new Event-Tag junctions
    let junctionArr = [];
    //Array of Tags now associated with the event
    let arr = [];
    //Create tag junctions
    if (Array.isArray(tags))
      for (let tag of tags) {
        junctionArr.push(
          await TaggedWith.create(
            {
              EventId: eventId,
              TagId: tag.id,
            },
            { transaction: transaction },
          ),
        );
      }
    console.log("Created tag junctions!");
    //Get Tag table rows that share a junction with the Event
    for (let junction of junctionArr) {
      await Tag.findOne(
        {
          where: {
            id: junction.TagId,
          },
        },
        { transaction: transaction },
      ).then((associatedTag) => {
        if (associatedTag != null) {
          console.log("");
          arr.push(associatedTag.dataValues);
        } else {
          let msg = "Associated tag not found!";
          console.log(msg);
          throw new Error(msg);
        }
      });
    }
    console.log("Found tag associations!");
    return arr;
  }

  /**
   * Add Acts to Act table, and add Act-Event junctions to EventAct table
   * @param {*} acts
   * @param {*} eventId
   * @param {*} transaction
   * @returns {Array} Array of acts
   */
  async CreateActs(acts, eventId, transaction) {
    let arr = [];
    //Create each act and event-act junction
    if (Array.isArray(acts))
      for (let act of acts) {
        //Create the act
        let actObj = await Act.create(
          {
            name: act.name,
          },
          { transaction: transaction },
        );
        //Append act to created acts array
        arr.push(actObj);
        //Create the junction
        let junction = await EventAct.create(
          {
            ActId: actObj.id,
            EventId: eventId,
          },
          { transaction: transaction },
        );
      }
    return arr;
  }

  /**
   * Add Event-TicketType junction rows
   * @param {*} ticketTypes
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*} Array of ticketTypes
   */
  async CreateTicketTypes(ticketTypes, eventId, transaction) {
    let arr = [];
    //Create each ticket and event-ticket junction
    if (Array.isArray(ticketTypes))
      for (let tier of ticketTypes) {
        //Create the ticket type
        let ticketType = await TicketType.create(
          {
            name: tier.name,
            price: tier.price,
          },
          { transaction: transaction },
        );
        //Add ticket type to array of created ticket
        arr.push(ticketType);
        //Create the junction
        let junction = await EventTicket.create(
          {
            TicketTypeId: ticketType.id,
            EventId: eventId,
          },
          { transaction: transaction },
        );
      }
    return arr;
  }
}

//Export handler
module.exports = new CreateEventHandler();
