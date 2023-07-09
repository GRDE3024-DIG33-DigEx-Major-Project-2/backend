/**
 * Tag model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });
};