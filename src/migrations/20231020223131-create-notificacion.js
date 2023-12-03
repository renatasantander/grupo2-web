/* eslint-disable no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notificacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mensaje: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leido: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      proyecto: {
        type: Sequelize.INTEGER,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notificacions');
  },
};
