'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ManageFriend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với model User (quan hệ nhiều-nhiều với chính User)
      ManageFriend.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user',
      });

      ManageFriend.belongsTo(models.User, {
        foreignKey: 'friend_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'friend',
      });
    }
  }

  ManageFriend.init({
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    friend_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'blocked'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'ManageFriend',
    tableName: 'manage_friend',
    timestamps: true, // Để Sequelize tự động quản lý createdAt và updatedAt
    underscored: true, // Để sử dụng tên trường kiểu snake_case (vd: created_at)
  });

  return ManageFriend;
};
