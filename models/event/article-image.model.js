/**
 * Article Image model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('ArticleImage', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl:true
      },
      altText: {
        type: DataTypes.STRING,
        allowNull: false
      },
      //If the image is grouped with other images, use this for ordering
      position: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
  });
};