/**
 * Update user db handler
 *
 */

//Import dependencies
const enumUtil = require("../../../util/enum.util");
//Load required db models for querying
const { db } = require("../../../db/models/db");
const { Organizer, Attendee } = db.models;

//Db update handler for Users (Organizer/Attendee)
class UpdateUserHandler {
  /**
   * Update the user (Organizer/Attendee)
   * @param {*} newData
   * @param {*} profileImgFilename
   * @param {*} currUser
   * @param {*} t
   * @param {boolean} noReplacement Flags if profile image filename should be updated
   * @returns
   */
  async Update(
    newData,
    profileImgFilename,
    currUser,
    t,
    noReplacement,
    unchangedImg,
  ) {
    let user;
    console.log("Beginning user update");
    console.log("Profile image url " + profileImgFilename);
    //Update the Attendee
    if (currUser.user.userType == enumUtil.userTypes.attendee)
      user = await this.UpdateAttendee(
        newData,
        profileImgFilename,
        currUser.user,
        t,
        noReplacement,
        unchangedImg,
      );
    //Update the Organizer
    else if (currUser.user.userType == enumUtil.userTypes.organizer)
      user = await this.UpdateOrganizer(
        newData,
        profileImgFilename,
        currUser.user,
        t,
        noReplacement,
        unchangedImg,
      );

    return user;
  }

  /**
   * Update Attendee table row
   * @param {*} newData
   * @param {*} currUser
   * @param {*} transaction
   * @param {boolean} noReplacement Flags if profile image filename should be updated
   * @returns The updated attendee in db
   */
  async UpdateAttendee(
    newData,
    profileImgFilename,
    currUser,
    transaction,
    noReplacement,
    unchangedImg,
  ) {
    let updatedUser;
    console.log("Updating Attendee");

    //Initialise update data object with correct fields
    let updateData = {};
    if (newData.firstName) updateData.firstName = newData.firstName;
    if (newData.lastName) updateData.lastName = newData.lastName;
    if (newData.dob) updateData.dob = newData.dob;
    if (newData.bio) updateData.bio = newData.bio;

    if (
      noReplacement == true &&
      unchangedImg == false &&
      (newData.removeImg == true || newData.removeImg == "true")
    ) {
      console.log("Test. Should happen only if removing if no replacement");
      console.log(
        noReplacement,
        newData.removeImg == true,
        newData.removeImg == "true",
      );
      updateData.imgFilename = "";
    } else if (
      noReplacement == false &&
      unchangedImg == false &&
      (profileImgFilename || profileImgFilename == "")
    ) {
      console.log("Test. Should happen only if uploading new image");
      console.log(
        noReplacement,
        profileImgFilename,
        profileImgFilename === "",
        profileImgFilename || profileImgFilename == "",
      );
      updateData.imgFilename = profileImgFilename;
    } else if (
      profileImgFilename &&
      profileImgFilename != "" &&
      unchangedImg == false &&
      noReplacement == false
    ) {
      console.log("Test. Should happen only if no changes");
      console.log(
        noReplacement,
        profileImgFilename,
        profileImgFilename === "",
        profileImgFilename || profileImgFilename == "",
      );
    } else if (
      (noReplacement == false, profileImgFilename, profileImgFilename != "")
    ) {
      console.log("Should only happen if uploading from none");
      updateData.imgFilename = profileImgFilename;
    }

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
   * @param {boolean} noReplacement Flags if profile image filename should be updated
   * @returns The updated organizer in db
   */
  async UpdateOrganizer(
    newData,
    profileImgFilename,
    currUser,
    transaction,
    noReplacement,
    unchangedImg,
  ) {
    let updatedUser;
    console.log("Updating Organizer");

    //Initialise update data object with correct fields
    let updateData = {};
    if (newData.organizationName)
      updateData.organizationName = newData.organizationName;
    if (newData.phoneNumber) updateData.phoneNumber = newData.phoneNumber;
    if (newData.bio) updateData.bio = newData.bio;

    if (
      noReplacement == true &&
      unchangedImg == false &&
      (newData.removeImg == true || newData.removeImg == "true")
    ) {
      console.log("Test. Should happen only if removing if no replacement");
      console.log(
        noReplacement,
        newData.removeImg == true,
        newData.removeImg == "true",
      );
      updateData.imgFilename = "";
    } else if (
      noReplacement == false &&
      unchangedImg == false &&
      (profileImgFilename || profileImgFilename == "")
    ) {
      console.log("Test. Should happen only if uploading new image");
      console.log(
        noReplacement,
        profileImgFilename,
        profileImgFilename === "",
        profileImgFilename || profileImgFilename == "",
      );
      updateData.imgFilename = profileImgFilename;
    } else if (
      profileImgFilename &&
      profileImgFilename != "" &&
      unchangedImg == false &&
      noReplacement == false
    ) {
      console.log("Test. Should happen only if no changes");
      console.log(
        noReplacement,
        profileImgFilename,
        profileImgFilename === "",
        profileImgFilename || profileImgFilename == "",
      );
    } else if (
      (noReplacement == false, profileImgFilename, profileImgFilename != "")
    ) {
      console.log("Should only happen if uploading from none");
      updateData.imgFilename = profileImgFilename;
    }

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
