'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DeletedMessage extends Model {
    /**
     * Định nghĩa các quan hệ giữa các bảng (nếu cần).
     */
    static associate(models) {
      DeletedMessage.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        as: 'conversation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DeletedMessage.belongsTo(models.Message, {
        foreignKey: 'message_id',
        as: 'message',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DeletedMessage.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  DeletedMessage.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      message_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Messages',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      modelName: 'DeletedMessage',
      tableName: 'deleted_message',
    }
  );

  return DeletedMessage;
};
