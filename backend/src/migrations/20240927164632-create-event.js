'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      club_id: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING(100),  
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),  
        allowNull: true,
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      modify_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};
