const { Inscripciones } = require('../models');

class InscripcionesService {
  /**
   * Obtener todas las inscripciones
   */
  async getAllInscripciones() {
    try {
      const inscripciones = await Inscripciones.findAll({
        include: [
          {
            model: Inscripciones.sequelize.models.Estudiantes,
            as: 'estudiante',
            attributes: ['id_estudiante', 'nombre', 'email']
          },
          {
            model: Inscripciones.sequelize.models.Cursos,
            as: 'curso',
            include: [
              {
                model: Inscripciones.sequelize.models.Profesores,
                as: 'profesor',
                attributes: ['id_profesor', 'nombre', 'especialidad']
              }
            ]
          }
        ]
      });
      return { success: true, data: inscripciones };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener inscripción por ID
   */
  async getInscripcionById(id) {
    try {
      const inscripcion = await Inscripciones.findByPk(id, {
        include: [
          {
            model: Inscripciones.sequelize.models.Estudiantes,
            as: 'estudiante'
          },
          {
            model: Inscripciones.sequelize.models.Cursos,
            as: 'curso',
            include: [
              {
                model: Inscripciones.sequelize.models.Profesores,
                as: 'profesor'
              }
            ]
          }
        ]
      });
      
      if (!inscripcion) {
        return { success: false, error: 'Inscripción no encontrada' };
      }
      
      return { success: true, data: inscripcion };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nueva inscripción
   */
  async createInscripcion(inscripcionData) {
    try {
      // Verificar que el estudiante no esté ya inscrito en el curso
      const inscripcionExistente = await Inscripciones.findOne({
        where: {
          id_estudiante: inscripcionData.id_estudiante,
          id_curso: inscripcionData.id_curso
        }
      });

      if (inscripcionExistente) {
        return { 
          success: false, 
          error: 'El estudiante ya está inscrito en este curso' 
        };
      }

      const inscripcion = await Inscripciones.create(inscripcionData);
      return { success: true, data: inscripcion };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar inscripción
   */
  async updateInscripcion(id, inscripcionData) {
    try {
      const inscripcion = await Inscripciones.findByPk(id);
      
      if (!inscripcion) {
        return { success: false, error: 'Inscripción no encontrada' };
      }
      
      await inscripcion.update(inscripcionData);
      return { success: true, data: inscripcion };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar inscripción
   */
  async deleteInscripcion(id) {
    try {
      const inscripcion = await Inscripciones.findByPk(id);
      
      if (!inscripcion) {
        return { success: false, error: 'Inscripción no encontrada' };
      }
      
      await inscripcion.destroy();
      return { success: true, message: 'Inscripción eliminada correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener inscripciones por estudiante
   */
  async getInscripcionesByEstudiante(estudianteId) {
    try {
      const inscripciones = await Inscripciones.findAll({
        where: { id_estudiante: estudianteId },
        include: [
          {
            model: Inscripciones.sequelize.models.Cursos,
            as: 'curso',
            include: [
              {
                model: Inscripciones.sequelize.models.Profesores,
                as: 'profesor'
              }
            ]
          }
        ]
      });
      return { success: true, data: inscripciones };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener inscripciones por curso
   */
  async getInscripcionesByCurso(cursoId) {
    try {
      const inscripciones = await Inscripciones.findAll({
        where: { id_curso: cursoId },
        include: [
          {
            model: Inscripciones.sequelize.models.Estudiantes,
            as: 'estudiante'
          }
        ]
      });
      return { success: true, data: inscripciones };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estadísticas de inscripciones
   */
  async getInscripcionesStats() {
    try {
      const totalInscripciones = await Inscripciones.count();
      const inscripcionesPorCurso = await Inscripciones.findAll({
        attributes: [
          'id_curso',
          [Inscripciones.sequelize.fn('COUNT', Inscripciones.sequelize.col('id_inscripcion')), 'total_estudiantes']
        ],
        include: [
          {
            model: Inscripciones.sequelize.models.Cursos,
            as: 'curso',
            attributes: ['nombre_curso']
          }
        ],
        group: ['id_curso', 'curso.nombre_curso'],
        order: [[Inscripciones.sequelize.literal('total_estudiantes'), 'DESC']]
      });
      
      return {
        success: true,
        data: {
          total: totalInscripciones,
          porCurso: inscripcionesPorCurso
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Verificar si un estudiante está inscrito en un curso
   */
  async isEstudianteInscrito(estudianteId, cursoId) {
    try {
      const inscripcion = await Inscripciones.findOne({
        where: {
          id_estudiante: estudianteId,
          id_curso: cursoId
        }
      });
      
      return { 
        success: true, 
        data: { 
          inscrito: !!inscripcion,
          inscripcion: inscripcion 
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener inscripciones por fecha
   */
  async getInscripcionesByFecha(fechaInicio, fechaFin) {
    try {
      const inscripciones = await Inscripciones.findAll({
        where: {
          createdAt: {
            [Inscripciones.sequelize.Op.between]: [fechaInicio, fechaFin]
          }
        },
        include: [
          {
            model: Inscripciones.sequelize.models.Estudiantes,
            as: 'estudiante'
          },
          {
            model: Inscripciones.sequelize.models.Cursos,
            as: 'curso'
          }
        ]
      });
      return { success: true, data: inscripciones };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new InscripcionesService();
