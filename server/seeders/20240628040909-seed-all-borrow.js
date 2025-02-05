'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/borrow.json').map(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
     })
     await queryInterface.bulkInsert("Borrows", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Borrows')
  }
};
