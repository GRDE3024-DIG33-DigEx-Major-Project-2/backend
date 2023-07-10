/**
 * Event Image model
 */

const { DataTypes } = require('sequelize');
const constantsUtil = require('../../../util/constants.util');


module.exports = (sequelize) => {
  sequelize.define('EventImage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    EventId: {
      type: DataTypes.UUID,
      primaryKey: false,
      references: {
        model: 'Event',
        key: 'id'
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${constantsUtil.BUCKET_URI}${this.filename}${constantsUtil.IMG_MIMETYPE}`;
      }
    }
  });
};