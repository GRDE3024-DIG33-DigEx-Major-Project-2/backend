/**
 * Performer model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Performer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      }
  });
};