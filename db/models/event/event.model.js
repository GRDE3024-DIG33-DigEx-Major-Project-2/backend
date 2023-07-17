/**
 * Event model
 */

const { DataTypes } = require("sequelize");
const enumUtil = require("../../../util/enum.util");

//Event Model definition
module.exports = (sequelize) => {
  sequelize.define("Event", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //FK to Organizer row
    OrganizerId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Organizer",
        key: "id",
      },
    },
    //The title of the event
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The venue name for the event
    venueName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The description of the event
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The summary of the event
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //Start date and time of the event (YYYY-MM-DD HH:MM:SS)
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //End date and time of the event (YYYY-MM-DD HH:MM:SS)
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //Address of the event
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The city the event is in
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The region the event is in
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The postcode for the event's venue
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The country the event is in
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //If the event is free entry with no ticket requirement
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    //The third-party provider purchase url for the event
    purchaseUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //The status for the event
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: enumUtil.eventStatus.upcoming,
    },
  });
};
