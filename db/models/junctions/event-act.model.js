/**
 * Event-Act Junction Model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('EventAct', {
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
    ActId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: 'Act',
          key: 'id'
        },
    }
  });
};