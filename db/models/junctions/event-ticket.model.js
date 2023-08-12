/**
 * Event-Ticket Junction Model
 */

//Import dependencies
const { DataTypes } = require("sequelize");

//EventTicket junction model definition
module.exports = (sequelize) => {
  sequelize.define("EventTicket", {
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
    //FK to the TicketType table row
    TicketTypeId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "TicketType",
        key: "id",
      },
    },
  });
};
