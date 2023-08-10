/**
 * Delete event db handler
 *
 */

const { db } = require("../../../db/models/db");
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
  Tag,
} = db.models;

class DeleteEventHandler {
  /**
   * Attempt to delete event data in db
   * @returns
   */
  async Delete(eventId, t) {
    //Data to return
    let data = {
      //Message for deletion result
      resultMsg: "",
      //Event Image filename to delete
      eventImgFilename: null,
    };

    //Delete Attendee junctions
    console.log(await this.DeleteFavouritedBy(eventId, t));
    //Delete Tag junctions
    console.log(await this.DeleteTaggedWith(eventId, t));
    //Delete Act junctions and Acts
    console.log(await this.DeleteActs(eventId, t));
    //Delete Ticket Types and Ticket Type junctions
    console.log(await this.DeleteTicketTypes(eventId, t));
    //Delete Event Image
    data.eventImgFilename = await this.DeleteEventImage(eventId, t);
    console.log("Event Image Filename: " + data.eventImgFilename);
    //Delete Event
    console.log(await this.DeleteEvent(eventId, t));

    //Return result message and event image filename
    data.resultMsg = "Event db deletion processed finished";
    console.log(data.resultMsg);
    return data;
  }

  /**
   * Delete Event-Attendee junction rows
   * @param {*} eventId
   * @param {*} transaction
   * @returns
   */
  async DeleteFavouritedBy(eventId, transaction) {
    //Deletion result
    let deleteResult;
    //Delete the tag junctions
    await FavouritedBy.destroy({
      where: { EventId: eventId },
      transaction: transaction,
    }).then((result) => {
      deleteResult = "FavouritedBy junctions deleted: " + result;
      console.log(deleteResult);
    });
    //Return deletion result
    return deleteResult;
  }

  /**
   * Delete Event-Tag junction rows
   * @param {*} tags
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*}
   */
  async DeleteTaggedWith(eventId, transaction) {
    //Deletion result
    let deleteResult;
    //Delete the tag junctions
    await TaggedWith.destroy({
      where: { EventId: eventId },
      transaction: transaction,
    }).then((result) => {
      deleteResult = "Tag junctions deleted: " + result;
      console.log(deleteResult);
    });
    //Return deletion result
    return deleteResult;
  }

  /**
   * Delete Acts, and delete Act-Event junctions
   * @param {*} acts
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*}
   */
  async DeleteActs(eventId, transaction) {
    //Deletion result
    let deleteResult;
    //Number of Acts deleted
    let count = 0;
    // Find all Event-Act junctions
    let junctions = await EventAct.findAll({
      where: { EventId: eventId },
      transaction: transaction,
    });

    // Delete the Event-Act junctions
    await EventAct.destroy({
      where: { EventId: eventId },
      transaction: transaction,
    });

    // Check if there are any more junctions referencing each Act before trying to delete
    for (let junc of junctions) {
      const remainingJunctions = await EventAct.count({
        where: { ActId: junc.dataValues.ActId },
        transaction: transaction,
      });

      if (remainingJunctions === 0) {
        await Act.destroy({
          where: { id: junc.dataValues.ActId },
          transaction: transaction,
        });
        count++;
      }
    }

    // //Find all Event-Act junctions
    // let junctions = await EventAct.findAll({
    //   where: { EventId: eventId },
    //   transaction: transaction,
    // });
    // //Delete the Event-Act junctions
    // await EventAct.destroy({
    //   where: { EventId: eventId },
    //   transaction: transaction,
    // }).then(async (result) => {
    //   console.log("EventAct junctions deleted: " + result);

    //   //Find and delete the Act rows after junctions were deleted
    //   for (let junc of junctions)
    //     await Act.destroy({
    //       where: { id: junc.dataValues.ActId },
    //       transaction: transaction,
    //     }).then((result) => {
    //       console.log("Act ID: " + junc.dataValues.ActId);
    //       console.log("Act deleted: " + result);
    //       //Increment counter for act deletion
    //       count++;
    //     });
    //   deleteResult = "Acts Deleted: " + count;
    // });

    //Return deletion result
    return deleteResult;
  }

  /**
   * Delete Event-TicketType junction rows
   * @param {*} ticketTypes
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*}
   */
  async DeleteTicketTypes(eventId, transaction) {
    //Deletion result
    let deleteResult;
    //Number of Ticket Types deleted
    let count = 0;

    //Find all Event-Ticket Type junctions
    let junctions = await EventTicket.findAll({
      where: { EventId: eventId },
      transaction: transaction,
    });
    //Delete the Event-Ticket Type junctions
    await EventTicket.destroy({
      where: { EventId: eventId },
      transaction: transaction,
    }).then(async (result) => {
      console.log("Ticket Type-Event junctions deleted: " + result);

      //Find and delete the Ticket Type rows after junctions were deleted
      for (let junc of junctions)
        await TicketType.destroy({
          where: { id: junc.dataValues.TicketTypeId },
          transaction: transaction,
        }).then((result) => {
          console.log("Ticket Type ID" + junc.dataValues.TicketTypeId);
          console.log("Ticket Type deleted: " + result);
          count++;
        });

      deleteResult = "Ticket Types Deleted: " + count;
    });

    //Return deletion result
    return deleteResult;
  }

  /**
   * Delete EventImage row
   * @param {*} eventId
   * @param {*} transaction
   * @returns {*}
   */
  async DeleteEventImage(eventId, transaction) {
    //Event image filename if it exists
    let filename = null;

    //Find the EventImage row
    let eventImg = await EventImage.findOne({
      where: { EventId: eventId },
      transaction: transaction,
    });
    //If event image exists, destroy it
    if (eventImg != null) {
      await EventImage.destroy({
        where: { id: eventImg.id },
        transaction: transaction,
      }).then((result) => {
        console.log("Event Image Deleted: " + result);
        console.log(eventImg);
        //If the event image row has a filename, assign to variable
        if (
          eventImg.dataValues.filename != null &&
          eventImg.dataValues.filename !== undefined
        ) {
          console.log("Event image filename found");
          filename = eventImg.dataValues.filename;
        }
      });
    }
    //Return the event image filename for deletion
    return filename;
  }

  /**
   * Delete Event row
   * @param {*} event
   * @param {*} transaction
   * @returns {*}
   */
  async DeleteEvent(eventId, transaction) {
    //Deletion result
    let deleteResult;

    await Event.destroy({
      where: { id: eventId },
      transaction: transaction,
    }).then((result) => {
      deleteResult = "Event Deleted: " + result;
    });

    //Return deletion result
    return deleteResult;
  }
}

//Export handler
module.exports = new DeleteEventHandler();
