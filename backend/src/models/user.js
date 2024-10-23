'use strict';
const path = require('path');
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
        through: 'member_role',
        foreignKey: 'user_id',  // Khóa ngoại trỏ về User trong Member_Role
        otherKey: 'role_id',     // Khóa ngoại trỏ về Role trong Member_Role
        as: 'roles'               // Alias cho các Role của User
      });

      User.belongsToMany(models.Club, {
        through: 'member_role',
        foreignKey: 'user_id',  // Khóa ngoại trỏ về User trong Member_Role
        otherKey: 'club_id',     // Khóa ngoại trỏ về Club trong Member_Role
        as: 'clubs'               // Alias cho các Club mà User tham gia
      });

      User.belongsToMany(models.Event, {
        through: 'event_participant',
        foreignKey: 'user_id',   // Khóa ngoại trỏ về User trong Event_Participant
        otherKey: 'event_id',     // Khóa ngoại trỏ về Event trong Event_Participant
        as: 'events'              // Alias cho các Event mà User tham gia
      });

      User.belongsToMany(models.Conversation, {  // Sửa từ 'Conversations' thành 'Conversation'
        through: 'conversation_participant',
        foreignKey: 'user_id',                // Khóa ngoại trỏ về User trong Conversation_Participants
        otherKey: 'conversation_id',          // Khóa ngoại trỏ về Conversation trong Conversation_Participants
        as: 'conversations'                     // Alias cho các Conversation mà User tham gia
      });

      User.belongsToMany(models.User, {
        as: 'Friends',
        through: 'manage_friend',
        foreignKey: 'user_id',
        otherKey: 'friend_id',
      });
    }

  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
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
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'default'
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
    // admin_system: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false,
    // }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};