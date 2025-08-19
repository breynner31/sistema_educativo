const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cursos = sequelize.define(
    "Cursos",
    {
      id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_curso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_profesor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cursos",
      timestamps: true,
    }
  );
  Cursos.associate = (models) => {
    Cursos.belongsTo(models.Profesores, {
      foreignKey: "id_profesor",
      as: "profesor",
    });
    Cursos.hasMany(models.Inscripciones, {
      foreignKey: "id_curso",
      as: "inscripciones",
    });
    Cursos.hasMany(models.Horarios, {
      foreignKey: "id_curso",
      as: "horarios",
    });
  };

  return Cursos;
};
