/**
 * Attendee model
 */

  const { DataTypes } = require('sequelize');
  const AuthUtil = require("../../../util/auth.util");
const enumUtil = require('../../../util/enum.util');
const constantsUtil = require('../../../util/constants.util');

  module.exports = (sequelize) => {
    sequelize.define('Attendee', {
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
          fullName: {
            type: DataTypes.VIRTUAL,
            get() {
              return `${this.firstName} ${this.lastName}`;
            }
          },
          bio: {
            type: DataTypes.TEXT,
            allowNull:true
          },
          dob: {
              type:DataTypes.DATEONLY,
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
          },
          imgUrl: {
            type: DataTypes.VIRTUAL,
            get() {
              if (this.imgFilename != "" && this.imgFilename != null)
              return `${constantsUtil.BUCKET_URI}${this.imgFilename}${constantsUtil.IMG_MIMETYPE}`;
              else return null;
            }
          },
          imgFilename: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
          },
          userType: {
            type: DataTypes.STRING,
            defaultValue: enumUtil.userTypes.attendee,
          }
      })
  };