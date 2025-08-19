const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Estudiantes = sequelize.define(
    "Estudiantes",
    {
      id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "estudiantes",
      timestamps: true,
    }
  );
    Estudiantes.associate = (models) => {
        Estudiantes.hasMany(models.Inscripciones, {
        foreignKey: "id_estudiante",
        as: "inscripciones",
        });
    };

    return Estudiantes;
};
