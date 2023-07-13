/**
 * Delete user db handler
 * 
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
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
	Tag
} = db.models;


class DeleteUserHandler {


    /**
     * Deletes an Organizer and related tables in the db
     */
    async DeleteOrganizer() {

    }



    /**
     * Deletes an Attendee and related tables in the db
     */
    async DeleteAttendee() {

    }






}


//Export handler
module.exports = new DeleteUserHandler();