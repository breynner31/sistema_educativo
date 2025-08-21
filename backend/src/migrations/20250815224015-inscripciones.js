"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("inscripciones", {
      id_inscripcion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "estudiantes",
          key: "id_estudiante",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      id_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cursos",
          key: "id_curso",
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
    await queryInterface.addIndex("inscripciones", ["id_estudiante"]);
    await queryInterface.addIndex("inscripciones", ["id_curso"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("inscripciones");
  },
};
