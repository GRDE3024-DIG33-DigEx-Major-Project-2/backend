/**
 * Attendee model
 */

//Import dependencies
const { DataTypes } = require("sequelize");
const AuthUtil = require("../../../util/auth.util");
const enumUtil = require("../../../util/enum.util");
const constantsUtil = require("../../../util/constants.util");

//Attendee Model definition
module.exports = (sequelize) => {
  sequelize.define("Attendee", {
    //Primary Key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //First name of the Attendee
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //Last name of the Attendee
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //Full name of the Attendee
    fullName: {
      type: DataTypes.VIRTUAL,
      /**
       * Get the full name of the Attendee
       * @returns The first name and last name concatenated
       */
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    //The Attendee's profile bio
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //The Attendee's date of birth, without the time (YYYY-MM-DD)
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    //The Attendee's unique email. Unique amongst both Attendees and Organizers
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    //The Attendee's hashed password
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
    //The Attendee's profile image url
    imgUrl: {
      type: DataTypes.VIRTUAL,
      /**
       * Builds and returns the profile image url string
       * @returns The profile image url
       */
      get() {
        if (this.imgFilename != "" && this.imgFilename != null)
          return `${constantsUtil.BUCKET_URI}${this.imgFilename}${constantsUtil.IMG_EXT}`;
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
      defaultValue: enumUtil.userTypes.attendee,
    },
  });
};
