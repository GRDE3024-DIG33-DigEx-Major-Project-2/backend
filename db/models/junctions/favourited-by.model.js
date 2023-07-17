/**
 * Attendee-Event Junction Model
 */

//Import dependencies
const { DataTypes } = require("sequelize");

//FavouritedBy junction model definition
module.exports = (sequelize) => {
  sequelize.define("FavouritedBy", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //FK to the Event table row
    EventId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Event",
        key: "id",
      },
    },
    //FK to the Attendee table row
    AttendeeId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Attendee",
        key: "id",
      },
    },
  });
};
