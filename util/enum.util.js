/**
 * Enum helpers
 *
 */

//Global enum helpers
class EnumUtil {
  //User types
  userTypes = {
    organizer: "organizer",
    attendee: "attendee",
  };

  //Event statuses
  eventStatus = {
    upcoming: "U",
    running: "R",
    finished: "F",
    draft: "D",
  };
}

//Export EnumUtil
module.exports = new EnumUtil();
