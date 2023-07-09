/**
 * Event-Ticket Junction Model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('EventTicket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    EventId: {
    type: DataTypes.UUID,
    primaryKey: false,
    references: {
      model: 'Event',
      key: 'id'
    }
    },
    TicketTypeId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: 'TicketType',
          key: 'id'
        },
    }
  });
};