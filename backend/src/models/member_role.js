'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class member_role extends Model {
        static associate(models) {
        }
    }

    member_role.init({
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false  // Đảm bảo không để null
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'member_role',
        tableName: "member_role",
        timestamps: false
    });

    return member_role;
};
