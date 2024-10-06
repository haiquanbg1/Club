'use strict';
/** @type {import('sequelize-cli').Migration} */
const path = require("path");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: path.join(__dirname, '../public/images/default.png')
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Thêm unique cho username
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      admin_system: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};