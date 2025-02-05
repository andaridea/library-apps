'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Book_Shelves", "book_amount")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Book_Shelves", "book_amount", {
      type: DataTypes.INTEGER
    })
  }
};
