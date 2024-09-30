'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'member_role',
        foreignKey: 'role_id',    // Khóa ngoại trỏ về Role trong Member_Role
        otherKey: 'user_id',       // Khóa ngoại trỏ về User trong Member_Role
        as: 'users'                 // Alias cho các User mà Role có
      });

      Role.belongsToMany(models.Club, {
        through: 'member_role',
        foreignKey: 'role_id',    // Khóa ngoại trỏ về Role trong Member_Role
        otherKey: 'club_id',       // Khóa ngoại trỏ về Club trong Member_Role
        as: 'clubs'                 // Alias cho các Club mà Role có
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};