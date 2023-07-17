/**
 * Ticket type model
 */

const { DataTypes } = require("sequelize");

//TicketType Model definition
module.exports = (sequelize) => {
  sequelize.define("TicketType", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //The name of the ticket
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The price of the ticket
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
};
