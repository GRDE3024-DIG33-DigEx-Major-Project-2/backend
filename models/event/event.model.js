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
    venueName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    //TODO
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //If it has a free entry tier
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};