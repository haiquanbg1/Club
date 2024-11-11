'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DirectMessage extends Model {
    static associate(models) {
      // Liên kết với bảng Users (1-1 chat)
      DirectMessage.belongsTo(models.User, {
        as: 'sender',
        foreignKey: 'sender_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DirectMessage.belongsTo(models.User, {
        as: 'receiver',
        foreignKey: 'receiver_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  
  DirectMessage.init(
    {
      sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      receiver_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: 'DirectMessage',
      tableName: 'direct_messages',
      timestamps: true, // Đảm bảo có createdAt và updatedAt
    }
  );

  return DirectMessage;
};
