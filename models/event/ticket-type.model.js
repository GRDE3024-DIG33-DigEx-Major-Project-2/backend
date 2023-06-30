/**
 * Ticket type model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('TicketType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
  });
};