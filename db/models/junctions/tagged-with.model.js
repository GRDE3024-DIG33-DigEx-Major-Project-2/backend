/**
 * Tag-Event Junction Model
 */

//Import dependencies
const { DataTypes } = require("sequelize");

//EventAct junction model definition
module.exports = (sequelize) => {
  sequelize.define("TaggedWith", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //FK to the Event table row
    EventId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Event",
        key: "id",
      },
    },
    //FK to the Tag table row
    TagId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  });
};
