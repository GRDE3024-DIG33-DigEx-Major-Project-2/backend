/**
 * Event model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
          date: {
        type:DataTypes.DATE,
        allowNull:false
    },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
    ageRestriction: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    author: {
        type:DataTypes.STRING,
        allowNull:false
    },

  });
};