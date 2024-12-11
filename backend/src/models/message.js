'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        as: 'conversation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Message.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'sender',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Message.hasMany(models.Reaction, {
        foreignKey: 'message_id',
        as: 'react',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Message.init({
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
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('show', 'hided', 'deleted'),
      allowNull: false,
      defaultValue: 'show',
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};