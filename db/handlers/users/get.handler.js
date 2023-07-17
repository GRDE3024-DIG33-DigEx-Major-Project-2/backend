/**
 * Get user db handler
 *
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;

class GetUserHandler {}

//Export handler
module.exports = new GetUserHandler();
