'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với model User
      UserNotification.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
      });
      UserNotification.belongsTo(models.Notification, {
        foreignKey: 'notification_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'notification'
      });
    }
  }
  UserNotification.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    read_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserNotification',
    tableName: "user_notification"
  });
  return UserNotification;
};