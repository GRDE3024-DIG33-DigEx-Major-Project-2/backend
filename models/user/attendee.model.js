/**
 * Attendee model
 */

  const { DataTypes } = require('sequelize');
  const AuthUtil = require("../../util/auth.util");

  module.exports = (sequelize) => {
    sequelize.define('Attendee', {
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
          //TODO email will need additional logic for unique validation
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
            type: DataTypes.STRING,
            allowNull:true
          }
      })
  };