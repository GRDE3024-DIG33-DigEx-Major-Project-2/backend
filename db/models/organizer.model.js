/**
 * Organizer model
 */

  const { DataTypes } = require('sequelize');
  const AuthUtil = require("../../util/auth.util");


module.exports = (sequelize) => {
  sequelize.define('Organizer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull:true
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        }
      },
    organizationName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    phoneNumber: {
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
      }, 
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull:true
    }
    })
};