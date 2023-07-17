/**
 * Update user db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;

class UpdateUserHandler {
  async Update(newData, profileImgFilename, currUser, t) {
    let user;
    console.log("Beginning user update");

    if (currUser.userType == enumUtil.userTypes.attendee)
      user = await this.UpdateAttendee(
        newData,
        profileImgFilename,
        currUser,
        t,
      );
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
    console.log(newData);

    //Update user
    await Attendee.update(newData, {
      transaction: transaction,
      where: {
        id: currUser.id,
      },
    }).then(async () => {
      //Return the updated attendee row
      await Attendee.findOne({
        where: { id: currUser.id },
        transaction: transaction,
      }).then((value) => {
        updatedUser = value.dataValues;
      });
    });
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
    console.log(newData);

    await Organizer.update(newData, {
      transaction: transaction,
      where: {
        id: currUser.id,
      },
    }).then(async () => {
      //Return the updated organizer row
      await Organizer.findOne({
        where: { id: currUser.id },
        transaction: transaction,
      }).then((value) => {
        updatedUser = value.dataValues;
      });
    });
    return updatedUser;
  }
}

//Export handler
module.exports = new UpdateUserHandler();
