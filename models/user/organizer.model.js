/**
 * Organizer model
 */

  const { DataTypes } = require('sequelize');
  const AuthUtil = require("../../util/auth.util");


module.exports = (sequelize) => {
  sequelize.define('Organizer', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        }
      },
      dob: {
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    organizationName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      /**
       * Hash password
       * @param {*} value Unencrypted password
       */
      set(value) {
        this.setDataValue('password', AuthUtil.generateHash(value));
      }
    }
    })
};