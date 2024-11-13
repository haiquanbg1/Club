'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.belongsToMany(models.User, {
        through: 'conversation_participant',
        foreignKey: 'conversation_id',
        otherKey: 'user_id',
        as: 'participants'
      });

      // Liên kết Conversation với Club: 1 Club có n Conversation 
      Conversation.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club'
      });
    }
  }

  Conversation.init({
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Conversation',
  });

  return Conversation;
};
