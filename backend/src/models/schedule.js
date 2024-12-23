'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      // Thiết lập liên kết với model Event
      Schedule.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Schedule.init(
    {
      id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Schedule',
      tableName: 'Schedules',
    }
  );

  return Schedule;
};
