/**
 * Create user db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;

class CreateUserHandler {
  /**
   * Creates either an attendee or organizer in the db
   * @returns The created user (attendee or organizer)
   */
  async CreateUser(data, res) {
    let user = null;

    //Create an Attendee
    if (data.userType == enumUtil.userTypes.attendee) {
      console.log("Creating Attendee");
      user = await Attendee.create({
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        dob: data.dob,
        email: data.email,
        password: data.password,
        imgFilename: data.imgFilename,
      }).catch((reason) => {
        let msg = "Problem creating Attendee";
        console.log(msg);
        console.log(reason);
        return res.status(400).json({
          msg: msg,
          error: reason,
        });
      });
    }
    //Create an organizer
    else if (data.userType == enumUtil.userTypes.organizer) {
      console.log("Creating Organizer");
      user = await Organizer.create({
        bio: data.bio,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        organizationName: data.organizationName,
        imgFilename: data.imgFilename,
      }).catch((reason) => {
        let msg = "Problem creating Organizer";
        console.log(msg);
        console.log(reason);
        return res.status(400).json({
          msg: msg,
          error: reason,
        });
      });
    }
    //Return the created user
    return user;
  }

  /**
   * Finds if the email is already taken
   * @param {String} userType attendee OR organizer
   * @returns {boolean | any} TRUE if email is taken, FALSE if not
   */
  async IsEmailTaken(userType, email, res) {
    let result = true;
    //Check Attendees for the email
    if (userType == enumUtil.userTypes.attendee)
      await Attendee.findOne({ where: { email: email } })
        .then((value) => {
          //Exists, return true
          if (value != null) result = true;
          //Doesn't exist, return false
          else result = false;
        })
        .catch((reason) => {
          let msg =
            "Error occurred when checking if email is taken by an Attendee";
          console.log(msg);
          console.log(reason);
          return res.status(400).json({
            msg: msg,
            error: reason,
          });
        });
    //Check Organizers for the email
    else if (userType == enumUtil.userTypes.organizer) {
      await Organizer.findOne({ where: { email: email } })
        .then((value) => {
          //Exists, set to true true
          if (value != null) result = true;
          //Doesn't exist, set to false
          else result = false;
        })
        .catch((reason) => {
          let msg =
            "Error occurred when checking if email is taken by an Organizer";
          console.log(msg);
          console.log(reason);
          return res.status(400).json({
            msg: msg,
            error: reason,
          });
        });
    }

    //Return boolean indicating if email is already taken
    console.log(result);
    return result;
  }
}

//Export handler
module.exports = new CreateUserHandler();
