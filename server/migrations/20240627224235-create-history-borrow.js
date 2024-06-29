'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('History_Borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_borrow: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_return: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 14
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
    await queryInterface.dropTable('History_Borrows');
  }
};