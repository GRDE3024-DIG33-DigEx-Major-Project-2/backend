/**
 * Event Image model
 */

const { DataTypes } = require("sequelize");
const constantsUtil = require("../../../util/constants.util");

//Act Model definition
module.exports = (sequelize) => {
  sequelize.define("EventImage", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //FK to Event row
    EventId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Event",
        key: "id",
      },
    },
    //Filenmame of event image without the filename extension
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //Url to event image
    url: {
      type: DataTypes.VIRTUAL,
      /**
       * Builds and returns the event image url string
       * @returns The Event image url
       */
      get() {
        if (this.filename != "" && this.filename != null)
          return `${constantsUtil.BUCKET_URI}${this.filename}${constantsUtil.IMG_EXT}`;
        else return null;
      },
    },
  });
};
