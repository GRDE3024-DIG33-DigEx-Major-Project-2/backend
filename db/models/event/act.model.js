/**
 * Act model
*/

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Act', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateFormed: {
        type: DataTypes.DATEONLY,
        allowNull:true
      },

  });
};