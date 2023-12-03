// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Proyectos', [
    {
      titulo: 'Proyecto 1',
      estado: 'Privado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      titulo: 'Proyecto 2',
      estado: 'Compartido',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Proyectos', null, {}),
};
