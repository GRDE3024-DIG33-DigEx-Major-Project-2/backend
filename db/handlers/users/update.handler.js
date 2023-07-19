/**
 * Update user db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;

//Db update handler for Users (Organizer/Attendee)
class UpdateUserHandler {
  /**
   * Update the user (Organizer/Attendee)
   * @param {*} newData
   * @param {*} profileImgFilename
   * @param {*} currUser
   * @param {*} t
   * @returns
   */
  async Update(newData, profileImgFilename, currUser, t) {
    let user;
    console.log("Beginning user update");
    //Update the Attendee
    if (currUser.userType == enumUtil.userTypes.attendee)
      user = await this.UpdateAttendee(
        newData,
        profileImgFilename,
        currUser,
        t,
      );
    //Update the Organizer
    else if (currUser.userType == enumUtil.userTypes.organizer)
      user = await this.UpdateOrganizer(
        newData,
        profileImgFilename,
        currUser,
        t,
      );

    return user;
  }

  /**
   * Update Attendee table row
   * @param {*} newData
   * @param {*} currUser
   * @param {*} transaction
   * @returns The updated attendee in db
   */
  async UpdateAttendee(newData, profileImgFilename, currUser, transaction) {
    let updatedUser;
    console.log("Updating Attendee");

    newData.imgFilename = profileImgFilename;

    //Update user
    await Attendee.update(
      {
        firstName: newData.firstName,
        lastName: newData.lastName,
        dob: newData.dob,
        imgFilename: newData.imgFilename,
        bio: newData.bio,
      },
      {
        transaction: transaction,
        individualHooks: true,
        returning: true,
        where: {
          id: currUser.id,
        },
      },
    ).then(async (updateResult) => {
      //Assign the updated attendee row
      updatedUser = updateResult[1][0].dataValues;
    });
    //Return the updated user
    return updatedUser;
  }

  /**
   * Update Organizer table row
   * @param {*} newData
   * @param {*} currUser
   * @param {*} transaction
   * @returns The updated organizer in db
   */
  async UpdateOrganizer(newData, profileImgFilename, currUser, transaction) {
    let updatedUser;
    console.log("Updating Organizer");

    newData.imgFilename = profileImgFilename;

    await Organizer.update(
      {
        organizationName: newData.organizationName,
        phoneNumber: newData.phoneNumber,
        imgFilename: newData.imgFilename,
        bio: newData.bio,
      },
      {
        transaction: transaction,
        individualHooks: true,
        returning: true,
        where: {
          id: currUser.id,
        },
      },
    ).then(async (updateResult) => {
      //Assign the updated attendee row
      updatedUser = updateResult[1][0].dataValues;
    });

    //Return the updated user
    return updatedUser;
  }
}

//Export handler
module.exports = new UpdateUserHandler();
