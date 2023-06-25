/**
 * Attendee model
 */

  const { DataTypes } = require('sequelize');

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
            //TODO PASSWORD HASHING ON SET HOOK METHOD
            /**
             * Hash and salt password before saving to database
             * @param {*} value Unencrypted password
             */
            set(value) {
              this.setDataValue('password', hash(this.username + value));
            }
          }
      })
  };