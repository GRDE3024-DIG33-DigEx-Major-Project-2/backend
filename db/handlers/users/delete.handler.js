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
     * Delete user from db and their S3 images
     * @param {*} currUser 
     * @param {*} t 
     */
    async Delete(currUser, t) {
        //User type conditional
        if (currUser.userType == enumUtil.userTypes.attendee) {
            let deleteResult = await DeleteUserHandler.DeleteAttendee(currUser, t);
            //TODO DELETE USER IMAGES HERE
        }
            
        else if (currUser.userType == enumUtil.userTypes.organizer) {
            let deleteResult = await DeleteUserHandler.DeleteOrganizer(currUser, t);
            //TODO DELETE ORG AND USER IMAGES HERE
        }
            
    }

    /**
     * Deletes an Attendee and related tables in the db
     */
    async DeleteAttendee(currUser, t) {
        //TODO UNFINISHED
        //Delete user for org and attendee
        //Delete user image
        //RETURN MSG DETAILING OUTCOME

        
    }



    /**
     * Deletes an Organizer and related tables in the db
     */
    async DeleteOrganizer(currUser, t) {
        //TODO UNFINISHED
        //Delete event handler for org
        //Delete user image
        //RETURN MSG DETAILING OUTCOME
    }










}


//Export handler
module.exports = new DeleteUserHandler();