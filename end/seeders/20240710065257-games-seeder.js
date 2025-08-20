'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const games = require('../data/games.json')

    games.forEach((el) => {
      delete el.id // jaga2 kalo ada id, jangan sampe masuk
      el.createdAt = new Date() // tambahan untuk menyeseuaikan kolom default yang dibikin sama sequelize
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Games', games, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', null, {})
  }
};
