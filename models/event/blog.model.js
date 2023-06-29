/**
 * Blog model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
    date: {
        type:DataTypes.DATE,
        allowNull:false
    }
  });
};