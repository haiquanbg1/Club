'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.belongsToMany(models.Role, {
        through: 'Member_Role',
        foreignKey: 'user_id',  // Khóa ngoại trỏ về User trong Member_Role
        otherKey: 'role_id',     // Khóa ngoại trỏ về Role trong Member_Role
        as: 'roles'               // Alias cho các Role của User
      });
      
      User.belongsToMany(models.Club, {
        through: 'Member_Role',
        foreignKey: 'user_id',  // Khóa ngoại trỏ về User trong Member_Role
        otherKey: 'club_id',     // Khóa ngoại trỏ về Club trong Member_Role
        as: 'clubs'               // Alias cho các Club mà User tham gia
      });
      
      User.belongsToMany(models.Event, {
        through: 'Event_Participant',
        foreignKey: 'user_id',   // Khóa ngoại trỏ về User trong Event_Participant
        otherKey: 'event_id',     // Khóa ngoại trỏ về Event trong Event_Participant
        as: 'events'              // Alias cho các Event mà User tham gia
      });
      
      User.belongsToMany(models.Conversation, {  // Sửa từ 'Conversations' thành 'Conversation'
        through: 'Conversation_Participants',
        foreignKey: 'user_id',                // Khóa ngoại trỏ về User trong Conversation_Participants
        otherKey: 'conversation_id',          // Khóa ngoại trỏ về Conversation trong Conversation_Participants
        as: 'conversations'                     // Alias cho các Conversation mà User tham gia
      });
      
      User.belongsToMany(models.User, {
        as: 'Friends',
        through: 'Manage_Friend',
        foreignKey: 'user_id',
        otherKey: 'friend_id',
      });
    }
    
  }
  User.init({
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    admin_system: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    }


  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};