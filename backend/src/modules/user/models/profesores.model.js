const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Profesores = sequelize.define(
    "Profesores",
    {
      id_profesor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especialidad: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "profesores",
      timestamps: true,
    }
  );

  Profesores.associate = (models) => {
    Profesores.hasMany(models.Cursos, {
      foreignKey: "id_profesor",
      as: "cursos",
    });
    Profesores.hasMany(models.Horarios, {
      foreignKey: "id_profesor",
      as: "horarios",
    });
  };

  return Profesores;
};
