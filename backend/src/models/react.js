'use strict';
const {
    Model,
    UUID
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Reaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Mỗi Reaction thuộc về một Message
            Reaction.belongsTo(models.Message, {
                foreignKey: 'message_id',  
                as: 'message',  
                onDelete: 'CASCADE',  
            });
        }
    }

    Reaction.init({
        message_id: {
            type: DataTypes.UUID,  
            allowNull: false,
            references: {
                model: 'Messages',  
                key: 'id',  
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
        react: {
            type: DataTypes.TEXT,  
            allowNull: false,
            defaultValue: '',  
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,  
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,  
        }
    }, {
        sequelize,
        modelName: 'Reaction',
    });

    return Reaction;
};
