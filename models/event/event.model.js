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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    //FOR EXAMPLE, 123 FAKE STREET, FAKE SUBURB
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //If it has a free entry tier
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    purchaseUrl: {
      type: DataTypes.STRING,
      allowNull:true
    }
  });
};