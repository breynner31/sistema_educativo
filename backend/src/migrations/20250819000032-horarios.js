'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("horarios", {
      id_horario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cursos",
          key: "id_curso",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_profesor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "profesores",
          key: "id_profesor",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      dia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: Sequelize.TIME,
        allowNull: false,
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
    await queryInterface.addIndex("horarios", ["id_curso"]);
    await queryInterface.addIndex("horarios", ["id_profesor"]);
    await queryInterface.addIndex("horarios", ["dia"]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("horarios");
  }
};
