/**
 * Tag-Event Junction Model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('TaggedWith', {
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
    TagId: {
        type: DataTypes.UUID,
        primaryKey: false,
        references: {
          model: 'Tag',
          key: 'id'
        },
    }
  });
};