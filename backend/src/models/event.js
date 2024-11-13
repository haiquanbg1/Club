'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club',
      });
      Event.belongsToMany(models.User, {
        through: 'event_participant',
        foreignKey: 'event_id',
        otherKey: 'user_id',
        as: 'participants'
      });
    }
  }

  Event.init({
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Event',
  });

  return Event;
};