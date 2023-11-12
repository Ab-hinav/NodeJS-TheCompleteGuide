"use strict";

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
    await queryInterface.bulkInsert("users", [
      {
        first_name: "Abhi",
        last_name: "sing",
        email: "dsag",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "ewrerw",
        last_name: "sing",
        email: "dsag",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "reerw",
        last_name: "sing",
        email: "dsag",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
