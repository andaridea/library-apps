'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('History_Borrows', 'BorrowId', {
      type: DataTypes.INTEGER,
      references: {
        model: "Borrows",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("History_Borrows", "BorrowId")
  }
};
