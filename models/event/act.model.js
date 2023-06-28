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
      //TODO create genre enum later on
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
      },
      dateFormed: {
        type: DataTypes.DATEONLY,
        allowNull:true
      },

  });
};