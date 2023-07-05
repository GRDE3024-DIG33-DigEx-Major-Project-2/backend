/**
 * Act model
*/

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Act', {
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