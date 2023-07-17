/**
 * Organizer model
 */

//Import dependencies
const { DataTypes } = require("sequelize");
const AuthUtil = require("../../../util/auth.util");
const enumUtil = require("../../../util/enum.util");
const constantsUtil = require("../../../util/constants.util");

//Organizer Model definition
module.exports = (sequelize) => {
  sequelize.define("Organizer", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //The Organizer's profile bio
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //The Organizer's organization name
    organizationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The Organizer's phone number
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The Organizer's unique email. Unique amongst both Attendees and Organizers
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    //The Organizer's hashed password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      /**
       * Hash password
       * @param {*} value Unencrypted password
       */
      set(value) {
        this.setDataValue("password", AuthUtil.generateHash(value));
      },
    },
    //The Organizer's profile image url
    imgUrl: {
      type: DataTypes.VIRTUAL,
      /**
       * Builds and returns the profile image url string
       * @returns The profile image url
       */
      get() {
        if (this.imgFilename != "" && this.imgFilename != null)
          return `${constantsUtil.BUCKET_URI}${this.imgFilename}${constantsUtil.IMG_MIMETYPE}`;
        else return null;
      },
    },
    //The profile image filename, without the filename extension
    imgFilename: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    //Denotes whether the user is an Attendee or Organizer
    userType: {
      type: DataTypes.STRING,
      defaultValue: enumUtil.userTypes.organizer,
    },
  });
};
