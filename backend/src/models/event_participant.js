'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với model Event
      EventParticipant.belongsTo(models.Event, {
        foreignKey: 'event_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'event',
      });

      // Liên kết với model User
      EventParticipant.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user',
      });
    }
  }

  EventParticipant.init({
    event_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted"),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'EventParticipant',
    tableName: 'event_participant',

  });

  return EventParticipant;
};
