/**
 * Tag model
 */

//Import dependencies
const { DataTypes } = require("sequelize");

//Tag Model definition
module.exports = (sequelize) => {
  sequelize.define("Tag", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //The name of the tag
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
