/**
 * Update event db handler
 *
 */

//Defined models in Sequelize instance
const { db } = require("../../../db/models/db");
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

/**
 * Update event handler for db querying
 */
class UpdateEventHandler {
  /**
   * Attempt to update event data in db
   * @returns Updated event object
   */
  async Update(data, eventImgFilename, currUser, t) {
    //Updated event-related tables to return in response
    let eventData = {
      event: null,
      eventImg: null,
      tags: [],
      acts: [],
      ticketTypes: [],
    };

    console.log("Beginning Event update");

    //Update an Event
    eventData.event = await this.UpdateEvent(data.event, currUser, t);
    console.log("Event table Updated");

    //Update Event Image
    if (eventImgFilename != "") {
      eventData.eventImg = await this.UpdateEventImage(
        eventImgFilename,
        data.event.id,
        t,
      );
      console.log("EventImg Updated");
    }

    //Update Tag associations
    eventData.tags = await this.UpdateTaggedWith(data.tags, data.event.id, t);
    console.log("Tags Updated");

    //Update Act associations
    eventData.acts = await this.UpdateActs(
      data.acts,
      data.newActs,
      data.event.id,
      t,
    );
    console.log("Acts Updated");

    //Update Ticket Type associations
    eventData.ticketTypes = await this.UpdateTicketTypes(
      data.ticketTypes,
      data.newTicketTypes,
      data.event.id,
      t,
    );
    console.log("TicketTypes Updated");

    //Return the updated event db data
    console.log("Event update completed!");

    return eventData;
  }

  /**
   * Update Acts in Act table
   * @param {*} updatedActs
   * @param {*} eventId
   * @param {*} transaction
   */
  async UpdateActs(updatedActs, newActs, eventId, transaction) {
    //Array of updated acts
    let arr = [];
    //Acts after update
    let values = [];

    //Update acts in db
    if (Array.isArray(updatedActs))
      for (let updatedAct of updatedActs)
        if (updatedAct.name)
          await Act.update(
            {
              name: updatedAct.name,
            },
            {
              transaction: transaction,
              returning: true,
              where: { id: updatedAct.id },
            },
          )
            //Add updated record to array
            .then(async (updateResult) => {
              let updAct = await Act.findOne({
                where: { id: updatedAct.id },
                transaction: transaction,
              });
              values.push(updAct.dataValues);
            });

    //Add new acts to db
    if (Array.isArray(newActs))
      for (let newAct of newActs) {
        await Act.create(
          {
            name: newAct.name,
          },
          { transaction: transaction },
        )
          //Add created record to array
          .then((createResult) => {
            console.log(
              "Created act while updating: ",
              createResult.dataValues,
            );
            values.push(createResult.dataValues);
          });
      }
    try {
      //Add junction for newly created acts
      for (let val of values) {
        let actObj = await EventAct.findOne(
          { where: { ActId: val.id, EventId: eventId } },
          { transaction: transaction },
        );

        //Act junction not found, add it in
        if (actObj == null) {
          await EventAct.create(
            {
              EventId: eventId,
              ActId: val.id,
            },
            { transaction: transaction },
          )
            .then((createJuncResult) => {
              console.log("Created EventAct junction while updating Event");
              console.log(createJuncResult);
            })
            .catch((err) => {
              console.log("EventAct junction error while creating");
              console.log(err);
            });
        }
      }
      //Append updated acts to array for return
      for (let actObj of values) arr.push(actObj);
      //Delete act and act associations that don't appear in request body
      await EventAct.findAll(
        {
          where: {
            EventId: eventId,
          },
        },
        { transaction: transaction },
      ).then(async (currRows) => {
        let oldActIds = [];
        let newActIds = [];

        //Build array of old junction act ids
        oldActIds = currRows.map((x) => x.dataValues.ActId);

        //Build array of new junction act ids
        newActIds = values.map((x) => x.id);

        //Check if old act is found in new act ids
        //Delete act-event junction and act from db if not found in new act ids
        for (let oldId of oldActIds)
          if (newActIds.includes(oldId) === false) {
            console.log("deleting act and act-event junction rows");
            await EventAct.destroy(
              { where: { EventId: eventId, ActId: oldId } },
              { transaction: transaction },
            ).then(async () => {
              console.log("ActEvent row destroyed");
              await Act.destroy(
                { where: { id: oldId } },
                { transaction: transaction },
              ).then(() => {
                console.log("Act row destroyed");
              });
            });
          }
      });
    } catch (error) {
      console.log(
        "An error occured when adding junctions for newly created acts",
      );
      console.log(error);
    }

    //Return updated act array
    console.log("Finished updating act-related tables");
    return arr;
  }

  /**
   * Update Event-TicketType junction rows
   * @param {*} updatedTicketTypes
   * @param {*} eventId
   * @param {*} transaction
   */
  async UpdateTicketTypes(
    updatedTicketTypes,
    newTicketTypes,
    eventId,
    transaction,
  ) {
    //Array of updated ticket types
    let arr = [];
    //Updated ticket types
    let values = [];

    //Update ticket types in db
    if (Array.isArray(updatedTicketTypes))
      for (let updatedTicketType of updatedTicketTypes) {
        let updateData = {};
        if (updatedTicketType.name) updateData.name = updatedTicketType.name;
        if (updatedTicketType.price) updateData.price = updatedTicketType.price;
        await TicketType.update(updateData, {
          transaction: transaction,
          returning: true,
          where: { id: updatedTicketType.id },
        })
          //Add updated record to array
          .then(async (updateResult) => {
            console.log("Updated ticket type");
            let updTicket = await TicketType.findOne({
              where: { id: updatedTicketType.id },
              transaction: transaction,
            });
            values.push(updTicket.dataValues);
          });
      }

    //Add new ticket types to db
    if (Array.isArray(newTicketTypes))
      for (let newTicketType of newTicketTypes) {
        await TicketType.create(newTicketType, {
          transaction: transaction,
        })
          //Add created record to array
          .then(async (createResult) => {
            console.log("Created ticket type while updating event");
            values.push(createResult.dataValues);
            let newTicketJuncResponse = await EventTicket.create(
              { EventId: eventId, TicketTypeId: createResult.dataValues.id },
              { transaction: transaction },
            );
            console.log("New Ticket Junction created");
          });
      }

    //Append updated ticket types to array for return
    for (let actObj of values) arr.push(actObj);

    //Delete ticket type and ticket type associations that don't appear in request body
    await EventTicket.findAll(
      {
        where: {
          EventId: eventId,
        },
      },
      { transaction: transaction },
    ).then(async (currRows) => {
      let oldTicketTypeIds = [];
      let newTicketTypeIds = [];

      //Build array of old junction ticket type ids
      oldTicketTypeIds = currRows.map((x) => x.dataValues.TicketTypeId);

      //Build array of new junction ticket type ids
      newTicketTypeIds = values.map((x) => x.id);

      //Check if old ticket type is found in new ticket type ids
      //Delete event-ticket junction and ticket type from db if not found in new ticket type ids
      for (let oldId of oldTicketTypeIds)
        if (newTicketTypeIds.includes(oldId) == false) {
          console.log("deleting ticket type and event-ticket junction rows");
          await EventTicket.destroy(
            { where: { EventId: eventId, TicketTypeId: oldId } },
            { transaction: transaction },
          ).then(() => {
            console.log("EventTicket row destroyed");
          });
          await TicketType.destroy(
            { where: { id: oldId } },
            { transaction: transaction },
          ).then(() => {
            console.log("TicketType row destroyed");
          });
        }
    });

    //Return updated ticket type array
    console.log("Finished updating ticket type-related tables");
    return arr;
  }

  /**
   * Update Event table row
   * @param {*} event
   * @param {*} currUser
   * @param {*} transaction
   * @returns
   */
  async UpdateEvent(event, currUser, transaction) {
    let updatedEvent;

    //Initialise update data object with correct fields
    let updateData = {};
    if (event.title) updateData.title = event.title;
    if (event.venueName) updateData.venueName = event.venueName;
    if (event.description) updateData.description = event.description;
    if (event.summary) updateData.summary = event.summary;
    if (event.startDate) updateData.startDate = event.startDate;
    if (event.endDate) updateData.endDate = event.endDate;
    if (event.suburb) updateData.suburb = event.suburb;
    if (event.address) updateData.address = event.address;
    if (event.city) updateData.city = event.city;
    //if (event.region) updateData.region = event.region;
    if (event.postcode) updateData.postcode = event.postcode;
    if (event.country) updateData.country = event.country;
    if (event.isFree) updateData.isFree = event.isFree;
    if (event.purchaseUrl) updateData.purchaseUrl = event.purchaseUrl;

    await Event.update(updateData, {
      transaction: transaction,
      where: {
        OrganizerId: currUser.id,
        id: event.id,
      },
    }).then(async (numFieldsChanged) => {
      //Return the updated event row
      await Event.findByPk(event.id).then((value) => {
        updatedEvent = value.dataValues;
      });
    });
    return updatedEvent;
  }

  /**
   * Update EventImage table row
   * @param {*} eventImgFilename
   * @param {*} eventId
   * @param {*} transaction
   */
  async UpdateEventImage(eventImgFilename, eventId, transaction) {
    let updatedEventImg;

    let existingImg = await EventImage.findOne({
      transaction: transaction,
      where: { EventId: eventId },
    });

    //Initialise update data object with correct fields
    let updateData = {};
    if (eventImgFilename) updateData.filename = eventImgFilename;

    //If Event Image exists, update it
    if (existingImg != null) {
      console.log("Updating existing EventImage");
      await EventImage.update(updateData, {
        transaction: transaction,
        where: { EventId: eventId },
      }).then(async (numFieldsChanged) => {
        //Return the updated event row
        updatedEventImg = await EventImage.findOne({
          where: { EventId: eventId },
          transaction: transaction,
        });
      });
    }
    //If Event Image doesn't exist, create it
    else {
      console.log("Creating new EventImage...");
      await EventImage.create(
        {
          EventId: eventId,
          filename: eventImgFilename,
        },
        {
          transaction: transaction,
        },
      ).then(async (newEventImg) => {
        console.log("Created EventImage");
        //Return the created event row
        updatedEventImg = await EventImage.findOne({
          where: { EventId: eventId },
          transaction: transaction,
        });
      });
    }
    return updatedEventImg;
  }

  /**
   * Update Event-Tag junction rows
   * @param {*} newTags
   * @param {*} eventId
   * @param {*} transaction
   */
  async UpdateTaggedWith(newTags, eventId, transaction) {
    let arr = [];

    //Find tag junctions associated with this event
    await TaggedWith.findAll(
      { where: { EventId: eventId } },
      { transaction: transaction },
    ).then(async (oldJunctions) => {
      if (oldJunctions != null) {
        let oldIds = [];
        let newIds = [];

        //Build array of old junction tag ids
        oldIds = oldJunctions.map((x) => x.dataValues.TagId);

        //Build array of new junction tag ids
        if (Array.isArray(newTags)) newIds = newTags.map((x) => x.id);
        else newIds = [];

        //Remove disassociated tags from junction table
        for (let oldId of oldIds) {
          if (newIds.includes(oldId) == false) {
            await TaggedWith.destroy(
              { where: { EventId: eventId, TagId: oldId } },
              { transaction: transaction },
            ).then((value) => {
              console.log("Tag junction deleted...", value);
            });
          }
        }

        //Check if new id is in existing junction rows
        for (let newId of newIds) {
          //Add in new junction
          if (oldIds.includes(newId) == false) {
            await TaggedWith.create(
              {
                EventId: eventId,
                TagId: newId,
              },
              { transaction: transaction },
            );
          }
        }

        //Find updated junctions from db, return as array
        await TaggedWith.findAll(
          { where: { EventId: eventId } },
          { transaction: transaction },
        ).then(async (updatedJunctions) => {
          //Find all updated junctions
          for (let junc of updatedJunctions) {
            //Find each tag and push dataValues to array
            await Tag.findByPk(junc.TagId, { transaction: transaction }).then(
              (tag) => {
                if (tag != null) arr.push(tag.dataValues);
              },
            );
          }
        });
      }
    });
    //Return updated tag associations array
    return arr;
  }
}

//Export handler
module.exports = new UpdateEventHandler();
