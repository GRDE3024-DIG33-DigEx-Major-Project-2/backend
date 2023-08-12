/**
 * Get user db handler
 *
 */

//Load required db models for querying
const { db } = require("../../../db/models/db");
const { Organizer, Attendee } = db.models;

/**
 * The get user handler for db querying
 */
class GetUserHandler {
  /**
   * Find user in database by email
   * @param {*} email
   * @param {*} res
   * @returns
   */
  async GetUserByEmail(email, res) {
    try {
      //Check Attendees for user
      let attendee = await this.GetAttendeeByEmail(email);
      //console.log("Attendee search result: ", attendee);
      //Attendee was found, return it
      if (attendee) return attendee;

      let organizer = await this.GetOrganizerByEmail(email);
      //console.log("Organizer search result: ", organizer);
      //Organizer was found, return it
      if (organizer) return organizer;
    } catch (reason) {
      //Catch error, log to console, and send detailed 400 response
      let msg = "Failed to find user in database";
      console.log(msg);
      console.log(reason);
      return res.status(400).json({
        msg: msg,
        error: reason,
      });
    }
  }

  /**
   * Find Organizer in database by email
   * @param {*} email
   * @returns
   */
  async GetOrganizerByEmail(email) {
    return await Organizer.findOne({
      where: { email: email },
    });
  }

  /**
   * Find Attendee in database by email
   * @param {*} email
   * @returns
   */
  async GetAttendeeByEmail(email) {
    return await Attendee.findOne({
      where: { email: email },
    });
  }
}

//Export handler
module.exports = new GetUserHandler();
