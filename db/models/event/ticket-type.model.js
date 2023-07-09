/**
 * Ticket type model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('TicketType', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
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