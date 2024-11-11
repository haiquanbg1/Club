'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScheduleParticipant extends Model {
    static associate(models) {
      // Thiết lập liên kết với model Schedule
      ScheduleParticipant.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // Thiết lập liên kết với model User
      ScheduleParticipant.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  ScheduleParticipant.init(
    {
      schedule_id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Schedules',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'ScheduleParticipant',
      tableName: 'schedule_participant',
      timestamps: true,
      underscored: true,
    }
  );

  return ScheduleParticipant;
};
