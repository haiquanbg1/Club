'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'conversation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Notification.belongsToMany(models.User, {
        through: 'user_notification',
        foreignKey: 'notification_id',
        otherKey: 'user_id',
        as: 'notifications'
      });
    }
  }
  Notification.init({
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};