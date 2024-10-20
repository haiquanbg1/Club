'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class member_role extends Model {
        static associate(models) {
            member_role.belongsTo(models.Club, {
                foreignKey: 'club_id',
                as: 'clubs'
            });

            member_role.belongsTo(models.User, {
                foreignKey: "user_id",
                as: 'users'
            });

            member_role.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'roles'
            });
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
            type: DataTypes.UUID,
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
