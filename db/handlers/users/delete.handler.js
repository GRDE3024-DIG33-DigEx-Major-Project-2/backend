/**
 * Delete user db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
const s3Util = require("../../../util/s3.util");
const deleteEventHandler = require("../../handlers/events/delete.handler");
const getEventHandler = require("../../handlers/events/get.handler");
//Defined models in Sequelize instance
const { Organizer, Attendee, FavouritedBy } = db.models;

class DeleteUserHandler {
  /**
   * Delete user from db and their S3 images
   * @param {*} currUser
   * @param {*} t
   */
  async Delete(currUser, t) {
    //Delete result message
    let deleteResult = "";

    //User is an Attendee, delete their db table rows and images
    if (currUser.userType == enumUtil.userTypes.attendee) {
      //Delete db rows
      let deleteRowsResult = await this.DeleteAttendee(currUser, t);
      console.log(deleteRowsResult);
      //Delete profile image if it exists
      if (currUser.imgFilename != null)
        this.DeleteProfileImage(currUser.imgFilename);

      //Set the delete result message
      deleteResult = "Attendee deletion process complete";
    }
    //User is an Organizer, delete their db table rows and images
    else if (currUser.userType == enumUtil.userTypes.organizer) {
      //Filenames of events to delete
      let eventImgFilenames = [];
      //Find Events of Organizer
      await getEventHandler
        .FindOrganizerEvents(currUser.id, t)
        .then(async (events) => {
          console.log("Number of Found Organizer Events: " + events.length);
          //Delete the Organizer's events
          for (let event of events) {
            await deleteEventHandler
              .Delete(event.id, t)
              //Save the event image's filename for deletion if it exists
              .then((data) => {
                if (data.eventImgFilename != null) {
                  console.log("Event image filename found!");
                  eventImgFilenames.push(data.eventImgFilename);
                }
              });
          }

          //Delete db rows
          let deleteRowsResult = await this.DeleteOrganizer(currUser, t);
          console.log(deleteRowsResult);
          //Delete profile image if it exists
          if (currUser.imgFilename != null) {
            console.log("Profile image exists, deleting now");
            this.DeleteProfileImage(currUser.imgFilename);
          }
          console.log("Event Images to delete: " + eventImgFilenames.length);

          //Delete the event images of all deleted events
          for (let filename of eventImgFilenames) {
            //Delete event image from S3 bucket
            if (filename != "") {
              console.log(
                "Event Image Filename exists! Deleting Image from S3 bucket!",
              );
              await s3Util.deleteEventImage(filename).then((result) => {
                console.log("Event Image deletion successful");
                console.log(result);
              });
            }
          }

          //Set the delete result message
          deleteResult = "Organizer deletion process complete";
        });
    }

    //Return the delete result message
    return deleteResult;
  }

  /**
   * Deletes an Attendee and related tables in the db
   */
  async DeleteAttendee(currUser, t) {
    console.log("Deleting Attendee");
    let resultMsg;

    console.log("Deleting any existing FavouritedBy junctions");
    //Delete any Attendee-Event junctions
    await FavouritedBy.destroy({
      where: {
        AttendeeId: currUser.id,
      },
      transaction: t,
    })
      //Deletion process finished without error
      .then((deleteJuncResult) => {
        //Junctions found and deleted
        if (deleteJuncResult > 0) {
          console.log("Deleted FavouritedBy junctions: " + deleteJuncResult);
        }
        //No junctions found to delete
        else {
          console.log("No FavouritedBy junctions deleted!");
        }
      });

    //Delete the Attendee in db
    await Attendee.destroy({
      where: {
        id: currUser.id,
      },
      transaction: t,
    })
      //Attendee deletion process finished without error
      .then((deleteResult) => {
        //Attendees found and deleted
        if (deleteResult > 0) {
          resultMsg = "Deleted Attendees: " + deleteResult;
          console.log(resultMsg);
        }
        //No Attendees found to delete
        else {
          let msg = "No Attendee deleted!";
          console.log(msg);
          throw new Error(msg);
        }
      });

    return resultMsg;
  }

  /**
   * Deletes an Organizer in the db
   */
  async DeleteOrganizer(currUser, t) {
    let resultMsg;

    //Delete the Organizer in db
    await Organizer.destroy({
      where: {
        id: currUser.id,
      },
      transaction: t,
    })
      //Organizer deletion process finished without error
      .then((deleteResult) => {
        //Organizers found and deleted
        if (deleteResult > 0) {
          resultMsg = "Deleted Organizer: " + deleteResult;
          console.log(resultMsg);
        }
        //No Organizers found to delete
        else {
          let msg = "No Organizer deleted!";
          console.log(msg);
          throw new Error(msg);
        }
      });

    return resultMsg;
  }

  /**
   * Deletes the deleted user's profile image if it exists
   * @param {*} filename
   */
  async DeleteProfileImage(filename) {
    console.log("Image Url Value Test: " + filename);
    //Delete profile image from S3 bucket
    if (filename != "") {
      console.log("Image Url exists! Deleting Image from S3 bucket!");
      await s3Util.deleteProfileImage(filename).then((result) => {
        console.log("Profile Image deletion successful");
        console.log(result);
      });
    }
  }
}

//Export handler
module.exports = new DeleteUserHandler();
