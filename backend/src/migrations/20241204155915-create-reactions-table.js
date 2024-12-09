'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reactions', {
      id: {
        type: Sequelize.UUID,  // UUID làm khóa chính
        defaultValue: Sequelize.UUID,  // Tự động tạo UUID
        allowNull: false,
        primaryKey: true,
      },
      message_id: {
        type: Sequelize.UUID,  
        allowNull: false,
        references: {
          model: 'Messages',  
          key: 'id',  
        },
        onUpdate: 'CASCADE',  
        onDelete: 'CASCADE',  
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      react: {
        type: Sequelize.TEXT,  
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reactions');  // Xóa bảng Reactions khi rollback migration
  }
};
