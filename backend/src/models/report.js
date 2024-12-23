'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // Định nghĩa mối quan hệ
      Report.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      Report.belongsTo(models.Club, {
        foreignKey: 'club_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Report.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "processed"),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Report',
      tableName: 'Reports',
    }
  );

  return Report;
};
