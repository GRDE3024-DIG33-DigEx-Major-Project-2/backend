/**
 * Attendee-Event Junction Model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('FavouritedBy', {
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
    AttendeeId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: 'Attendee',
          key: 'id'
        },
    }
  });
};