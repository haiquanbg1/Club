'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Club.hasMany(models.Event, {
        foreignKey: 'club_id',
        as: 'events',
      });
      Club.hasMany(models.Notification, {
        foreignKey: 'club_id',
        as: 'notification',
      });
      Club.belongsToMany(models.Role, {
        through: 'member_role',
        foreignKey: 'club_id',  // Khóa ngoại trỏ về Club trong Member_Role
        otherKey: 'role_id',    // Khóa ngoại trỏ về Role trong Member_Role
        as: 'roles'             // Alias để mô tả rõ ràng hơn rằng đây là các Role của Club
      });

      Club.belongsToMany(models.User, {
        through: 'member_role',
        foreignKey: 'club_id',  // Khóa ngoại trỏ về Club trong Member_Role
        otherKey: 'user_id',    // Khóa ngoại trỏ về User trong Member_Role
        as: 'members'           // Alias để mô tả rằng đây là các User tham gia Club
      });
      Club.hasMany(models.Conversation, {
        foreignKey: 'club_id',
        as: 'conversation'
      });
    }
  }
  Club.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    },
  }, {
    sequelize,
    modelName: 'Club',
  });

  return Club;
};