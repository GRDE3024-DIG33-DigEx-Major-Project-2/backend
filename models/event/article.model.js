/**
 * Article model
 */

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Article', {
    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    author: {
        type:DataTypes.STRING,
        allowNull:false
    },
    date: {
        type:DataTypes.DATE,
        allowNull:false
    }
  });
};

