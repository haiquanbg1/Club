'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Event_Participant', {
      event_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: {
          model: 'Events', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true 
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Event_Participant');
  }
};
