/**
 * Performer model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Performer', {
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