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
    await queryInterface.bulkInsert("products", [
      {
        title: "firstProd",
        description: "lorem ipfsin",
        image_url: "https://picsum.photos/200/300",
        price: 12.33,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "second",
        description: "lorem ipfsin",
        image_url: "https://picsum.photos/200/300",
        price: 1.33,
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

    await queryInterface.bulkDelete("products", null, {});
  },
};
