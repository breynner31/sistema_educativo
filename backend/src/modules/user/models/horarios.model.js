const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Horarios = sequelize.define(
    "Horarios",
    {
      id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_profesor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "horarios",
      timestamps: true,
    }
  );

  Horarios.associate = (models) => {
    Horarios.belongsTo(models.Cursos, {
      foreignKey: "id_curso",
      as: "curso",
    });
    Horarios.belongsTo(models.Profesores, {
      foreignKey: "id_profesor",
      as: "profesor",
    });
  };

  return Horarios;
};
