'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với model Conversation
      ConversationParticipant.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'conversation'
      });

      // Liên kết với model User
      ConversationParticipant.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
      });
    }
  }

  // Khởi tạo model ConversationParticipant
  ConversationParticipant.init({
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ConversationParticipant',
    tableName: 'conversation_participant',
  });

  return ConversationParticipant;
};
