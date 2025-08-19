const { Horarios } = require('../models');

class HorariosService {
  /**
   * Obtener todos los horarios
   */
  async getAllHorarios() {
    try {
      const horarios = await Horarios.findAll({
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso',
            attributes: ['id_curso', 'nombre_curso'],
            include: [
              {
                model: Horarios.sequelize.models.Profesores,
                as: 'profesor',
                attributes: ['id_profesor', 'nombre', 'especialidad']
              }
            ]
          },
          {
            model: Horarios.sequelize.models.Profesores,
            as: 'profesor',
            attributes: ['id_profesor', 'nombre', 'especialidad']
          }
        ],
        order: [
          ['dia', 'ASC'],
          ['hora_inicio', 'ASC']
        ]
      });
      return { success: true, data: horarios };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener horario por ID
   */
  async getHorarioById(id) {
    try {
      const horario = await Horarios.findByPk(id, {
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso',
            include: [
              {
                model: Horarios.sequelize.models.Profesores,
                as: 'profesor'
              }
            ]
          },
          {
            model: Horarios.sequelize.models.Profesores,
            as: 'profesor'
          }
        ]
      });
      
      if (!horario) {
        return { success: false, error: 'Horario no encontrado' };
      }
      
      return { success: true, data: horario };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nuevo horario
   */
  async createHorario(horarioData) {
    try {
      // Verificar que no haya conflicto de horarios para el mismo curso
      const conflictoHorario = await Horarios.findOne({
        where: {
          id_curso: horarioData.id_curso,
          dia: horarioData.dia,
          [Horarios.sequelize.Op.or]: [
            {
              hora_inicio: {
                [Horarios.sequelize.Op.between]: [
                  horarioData.hora_inicio,
                  horarioData.hora_fin
                ]
              }
            },
            {
              hora_fin: {
                [Horarios.sequelize.Op.between]: [
                  horarioData.hora_inicio,
                  horarioData.hora_fin
                ]
              }
            }
          ]
        }
      });

      if (conflictoHorario) {
        return { 
          success: false, 
          error: 'Existe un conflicto de horarios para este curso en el mismo día' 
        };
      }

      const horario = await Horarios.create(horarioData);
      return { success: true, data: horario };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar horario
   */
  async updateHorario(id, horarioData) {
    try {
      const horario = await Horarios.findByPk(id);
      
      if (!horario) {
        return { success: false, error: 'Horario no encontrado' };
      }
      
      // Verificar conflictos solo si se cambia el día o las horas
      if (horarioData.dia || horarioData.hora_inicio || horarioData.hora_fin) {
        const conflictoHorario = await Horarios.findOne({
          where: {
            id_curso: horario.id_curso,
            dia: horarioData.dia || horario.dia,
            id_horario: { [Horarios.sequelize.Op.ne]: id },
            [Horarios.sequelize.Op.or]: [
              {
                hora_inicio: {
                  [Horarios.sequelize.Op.between]: [
                    horarioData.hora_inicio || horario.hora_inicio,
                    horarioData.hora_fin || horario.hora_fin
                  ]
                }
              },
              {
                hora_fin: {
                  [Horarios.sequelize.Op.between]: [
                    horarioData.hora_inicio || horario.hora_inicio,
                    horarioData.hora_fin || horario.hora_fin
                  ]
                }
              }
            ]
          }
        });

        if (conflictoHorario) {
          return { 
            success: false, 
            error: 'Existe un conflicto de horarios para este curso en el mismo día' 
          };
        }
      }
      
      await horario.update(horarioData);
      return { success: true, data: horario };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar horario
   */
  async deleteHorario(id) {
    try {
      const horario = await Horarios.findByPk(id);
      
      if (!horario) {
        return { success: false, error: 'Horario no encontrado' };
      }
      
      await horario.destroy();
      return { success: true, message: 'Horario eliminado correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener horarios por curso
   */
  async getHorariosByCurso(cursoId) {
    try {
      const horarios = await Horarios.findAll({
        where: { id_curso: cursoId },
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso'
          },
          {
            model: Horarios.sequelize.models.Profesores,
            as: 'profesor'
          }
        ],
        order: [
          ['dia', 'ASC'],
          ['hora_inicio', 'ASC']
        ]
      });
      return { success: true, data: horarios };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener horarios por profesor
   */
  async getHorariosByProfesor(profesorId) {
    try {
      const horarios = await Horarios.findAll({
        where: { id_profesor: profesorId },
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso'
          }
        ],
        order: [
          ['dia', 'ASC'],
          ['hora_inicio', 'ASC']
        ]
      });
      return { success: true, data: horarios };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener horarios por día
   */
  async getHorariosByDia(dia) {
    try {
      const horarios = await Horarios.findAll({
        where: { dia },
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso',
            include: [
              {
                model: Horarios.sequelize.models.Profesores,
                as: 'profesor'
              }
            ]
          },
          {
            model: Horarios.sequelize.models.Profesores,
            as: 'profesor'
          }
        ],
        order: [['hora_inicio', 'ASC']]
      });
      return { success: true, data: horarios };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener horarios por rango de horas
   */
  async getHorariosByRangoHoras(horaInicio, horaFin) {
    try {
      const horarios = await Horarios.findAll({
        where: {
          [Horarios.sequelize.Op.or]: [
            {
              hora_inicio: {
                [Horarios.sequelize.Op.between]: [horaInicio, horaFin]
              }
            },
            {
              hora_fin: {
                [Horarios.sequelize.Op.between]: [horaInicio, horaFin]
              }
            }
          ]
        },
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso'
          },
          {
            model: Horarios.sequelize.models.Profesores,
            as: 'profesor'
          }
        ],
        order: [
          ['dia', 'ASC'],
          ['hora_inicio', 'ASC']
        ]
      });
      return { success: true, data: horarios };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estadísticas de horarios
   */
  async getHorariosStats() {
    try {
      const totalHorarios = await Horarios.count();
      const horariosPorDia = await Horarios.findAll({
        attributes: [
          'dia',
          [Horarios.sequelize.fn('COUNT', Horarios.sequelize.col('id_horario')), 'total_horarios']
        ],
        group: ['dia'],
        order: [
          [Horarios.sequelize.literal('total_horarios'), 'DESC']
        ]
      });
      
      const horariosPorCurso = await Horarios.findAll({
        attributes: [
          'id_curso',
          [Horarios.sequelize.fn('COUNT', Horarios.sequelize.col('id_horario')), 'total_horarios']
        ],
        include: [
          {
            model: Horarios.sequelize.models.Cursos,
            as: 'curso',
            attributes: ['nombre_curso']
          }
        ],
        group: ['id_curso', 'curso.nombre_curso'],
        order: [
          [Horarios.sequelize.literal('total_horarios'), 'DESC']
        ]
      });
      
      return {
        success: true,
        data: {
          total: totalHorarios,
          porDia: horariosPorDia,
          porCurso: horariosPorCurso
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Verificar disponibilidad de horario
   */
  async verificarDisponibilidad(cursoId, dia, horaInicio, horaFin, horarioId = null) {
    try {
      const whereClause = {
        id_curso: cursoId,
        dia,
        [Horarios.sequelize.Op.or]: [
          {
            hora_inicio: {
              [Horarios.sequelize.Op.between]: [horaInicio, horaFin]
            }
          },
          {
            hora_fin: {
              [Horarios.sequelize.Op.between]: [horaInicio, horaFin]
            }
          }
        ]
      };

      if (horarioId) {
        whereClause.id_horario = { [Horarios.sequelize.Op.ne]: horarioId };
      }

      const conflictoHorario = await Horarios.findOne({ where: whereClause });
      
      return { 
        success: true, 
        data: { 
          disponible: !conflictoHorario,
          conflicto: conflictoHorario 
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new HorariosService();
