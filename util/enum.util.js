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


  //Pre-defined event genres
  genres = {
    rock: "Rock",
    country: "Country",
    jazz: "Jazz",
    electronic: "Electronic",
    reggae: "Reggae",
    dance: "Dance",
    metal: "Metal",
    hiphop: "Hip-hop",
    pop: "Pop",
    solo: "Solo",
    instrumental: "Instrumental",
    rap: "Rap",
    international: "International",
    blues: "Blues",
    indie: "Indie",
    classical: "Classical",
    
  };

}

//Export EnumUtil
module.exports = new EnumUtil();
