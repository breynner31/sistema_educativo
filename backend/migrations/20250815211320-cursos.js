"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cursos", {
      id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_curso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_profesor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "profesores",
          key: "id_profesor",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Agregar índices para mejorar el rendimiento
    await queryInterface.addIndex("cursos", ["nombre_curso"]);
    await queryInterface.addIndex("cursos", ["id_profesor"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("cursos");
  },
};
