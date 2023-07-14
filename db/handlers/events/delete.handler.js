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
	async Delete(eventId, currUser, t) {
		//DELETE EACH TABLE IN CORRECT ORDER
		//THEN, DELETE EVENT IMAGE IF IT EXISTS IN S3
		//RETURN MSG DETAILING THE DELETION OUTCOME
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