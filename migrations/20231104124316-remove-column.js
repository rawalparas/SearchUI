'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('book', '_id');
  },

  async down (queryInterface, Sequelize) {
    
  }
};
