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
    if (currUser.user.userType == enumUtil.userTypes.attendee)
      user = await this.UpdateAttendee(
        newData,
        profileImgFilename,
        currUser.user,
        t,
      );
    //Update the Organizer
    else if (currUser.user.userType == enumUtil.userTypes.organizer)
      user = await this.UpdateOrganizer(
        newData,
        profileImgFilename,
        currUser.user,
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

    //Initialise update data object with correct fields
    let updateData = {};
    if (newData.firstName) updateData.firstName = newData.firstName;
    if (newData.lastName) updateData.lastName = newData.lastName;
    if (newData.dob) updateData.dob = newData.dob;
    if (newData.bio) updateData.bio = newData.bio;
    if (profileImgFilename) updateData.imgFilename = profileImgFilename;

    //Update user
    await Attendee.update(updateData, {
      transaction: transaction,
      individualHooks: true,
      returning: true,
      where: {
        id: currUser.id,
      },
    }).then(async (updateResult) => {
      //Assign the updated attendee row
      if (updateResult[1][0].dataValues != null) {
        updatedUser = updateResult[1][0].dataValues;
        if (updatedUser.imgFilename && updatedUser.imgFilename != null)
          updatedUser.imgUrl = updateResult[1][0].get("imgUrl");
      }
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

    //Initialise update data object with correct fields
    let updateData = {};
    if (newData.organizationName)
      updateData.organizationName = newData.organizationName;
    if (newData.phoneNumber) updateData.phoneNumber = newData.phoneNumber;
    if (newData.bio) updateData.bio = newData.bio;
    if (profileImgFilename) updateData.imgFilename = profileImgFilename;

    await Organizer.update(updateData, {
      transaction: transaction,
      individualHooks: true,
      returning: true,
      where: {
        id: currUser.id,
      },
    }).then(async (updateResult) => {
      //Assign the updated organizer row
      if (updateResult[1][0].dataValues != null) {
        updatedUser = updateResult[1][0].dataValues;
        if (updatedUser.imgFilename && updatedUser.imgFilename != null)
          updatedUser.imgUrl = updateResult[1][0].get("imgUrl");
      }
    });

    //Return the updated user
    return updatedUser;
  }
}

//Export handler
module.exports = new UpdateUserHandler();
