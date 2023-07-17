/**
 * Act model
 */

const { DataTypes } = require("sequelize");

//Act Model definition
module.exports = (sequelize) => {
  sequelize.define("Act", {
    //Primary key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //The Act's name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
