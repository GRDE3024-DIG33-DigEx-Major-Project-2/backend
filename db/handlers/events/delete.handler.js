/**
 * Delete event db handler
 * 
 */

const enumUtil = require("../../../util/enum.util");
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
	Tag
} = db.models;


class DeleteEventHandler {


	/**
	 * Attempt to delete event data in db
	 * @returns 
	 */
	async Delete(data, eventImgFilename, currUser, t) {
		// //Event-related tables to return in response
		// let eventData = {
		// 	event: null,
		// 	eventImg: null,
		// 	tags: [],
		// 	acts: [],
		// 	ticketTypes: [],
		// };
		// //Create an Event
		// console.log("Init Event");
		// eventData.event = await this.DeleteEvent(data.event, currUser, t);
		// //Create Event Image 
		// if (eventImgFilename != "") {
		// 	console.log("Init Event Image");
		// 	await this.DeleteEventImage(eventImgFilename, eventData.event.id, t);
		// }
		// //Create Tag associations
		// console.log("Init Tags");
		// eventData.tags = await this.DeleteTaggedWith(data.tags, eventData.event.id, t);
		// //Create Act associations
		// console.log("Init Acts");
		// eventData.acts = await this.DeleteActs(data.acts, eventData.event.id, t);
		// //Create Ticket Type associations
		// console.log("Init Ticket Types");
		// eventData.ticketTypes = await this.DeleteTicketTypes(data.ticketTypes, eventData.event.id, t);
		// //Return the new event db data
		// console.log("Event created!");
		// return eventData;
	}




	/**
	 * Delete Event
	 * @param {*} event 
	 * @param {*} currUser 
	 * @param {*} transaction 
	 * @returns {*}
	 */
	async DeleteEvent(event, currUser, transaction) {
	}

	/**
	 * Delete EventImage
	 * @param {*} eventImgFilename 
	 * @param {*} eventId 
	 * @param {*} transaction 
	 * @returns {*}
	 */
	async DeleteEventImage(eventImgFilename, eventId, transaction) {
	}


	/**
	 * Delete Event-Tag junction rows
	 * @param {*} tags 
	 * @param {*} eventId 
	 * @param {*} transaction 
	 * @returns {*} 
	 */
	async DeleteTaggedWith(tags, eventId, transaction) {
	}


	/**
	 * Delete Acts, and delete Act-Event junctions
	 * @param {*} acts 
	 * @param {*} eventId 
	 * @param {*} transaction 
	 * @returns {*} 
	 */
	async DeleteActs(acts, eventId, transaction) {
	}


	/**
	 * Delete Event-TicketType junction rows
	 * @param {*} ticketTypes 
	 * @param {*} eventId 
	 * @param {*} transaction 
	 * @returns {*} 
	 */
	async DeleteTicketTypes(ticketTypes, eventId, transaction) {
	}


}


//Export handler
module.exports = new DeleteEventHandler();