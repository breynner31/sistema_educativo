const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Inscripciones = sequelize.define(
    "Inscripciones",
    {
      id_inscripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "inscripciones",
      timestamps: true,
    }
  );

  Inscripciones.associate = (models) => {
    Inscripciones.belongsTo(models.Estudiantes, {
      foreignKey: "id_estudiante",
      as: "estudiante",
    });
    Inscripciones.belongsTo(models.Cursos, {
      foreignKey: "id_curso",
      as: "curso",
    });
  };

  return Inscripciones;
};
