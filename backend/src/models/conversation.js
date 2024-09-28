'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.belongsToMany(models.User, { 
        through: 'Conversation_Participant', 
        foreignKey: 'conversation_id', 
        otherKey: 'user_id',           
        as: 'participants'             
      });
  
      // Liên kết Conversation với Club: 1 Club có 1 Conversation 
      Conversation.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club'
      });
    }
  }
  
  Conversation.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false 
    },
    create_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    modify_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    timestamps: false 
  });

  return Conversation;
};
