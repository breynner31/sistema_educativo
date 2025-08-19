const { Cursos } = require('../models');

class CursosService {
  /**
   * Obtener todos los cursos
   */
  async getAllCursos() {
    try {
      const cursos = await Cursos.findAll({
        include: [
          {
            model: Cursos.sequelize.models.Profesores,
            as: 'profesor',
            attributes: ['id_profesor', 'nombre', 'especialidad']
          },
          {
            model: Cursos.sequelize.models.Inscripciones,
            as: 'inscripciones',
            include: [
              {
                model: Cursos.sequelize.models.Estudiantes,
                as: 'estudiante',
                attributes: ['id_estudiante', 'nombre', 'email']
              }
            ]
          },
          {
            model: Cursos.sequelize.models.Horarios,
            as: 'horarios',
            attributes: ['id_horario', 'dia', 'hora_inicio', 'hora_fin']
          }
        ]
      });
      return { success: true, data: cursos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener curso por ID
   */
  async getCursoById(id) {
    try {
      const curso = await Cursos.findByPk(id, {
        include: [
          {
            model: Cursos.sequelize.models.Profesores,
            as: 'profesor'
          },
          {
            model: Cursos.sequelize.models.Inscripciones,
            as: 'inscripciones',
            include: [
              {
                model: Cursos.sequelize.models.Estudiantes,
                as: 'estudiante'
              }
            ]
          },
          {
            model: Cursos.sequelize.models.Horarios,
            as: 'horarios'
          }
        ]
      });
      
      if (!curso) {
        return { success: false, error: 'Curso no encontrado' };
      }
      
      return { success: true, data: curso };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nuevo curso
   */
  async createCurso(cursoData) {
    try {
      const curso = await Cursos.create(cursoData);
      return { success: true, data: curso };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar curso
   */
  async updateCurso(id, cursoData) {
    try {
      const curso = await Cursos.findByPk(id);
      
      if (!curso) {
        return { success: false, error: 'Curso no encontrado' };
      }
      
      await curso.update(cursoData);
      return { success: true, data: curso };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar curso
   */
  async deleteCurso(id) {
    try {
      const curso = await Cursos.findByPk(id);
      
      if (!curso) {
        return { success: false, error: 'Curso no encontrado' };
      }
      
      await curso.destroy();
      return { success: true, message: 'Curso eliminado correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Buscar cursos por nombre
   */
  async getCursosByNombre(nombre) {
    try {
      const cursos = await Cursos.findAll({
        where: {
          nombre_curso: {
            [Cursos.sequelize.Op.iLike]: `%${nombre}%`
          }
        },
        include: [
          {
            model: Cursos.sequelize.models.Profesores,
            as: 'profesor'
          }
        ]
      });
      return { success: true, data: cursos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener cursos por profesor
   */
  async getCursosByProfesor(profesorId) {
    try {
      const cursos = await Cursos.findAll({
        where: { id_profesor: profesorId },
        include: [
          {
            model: Cursos.sequelize.models.Profesores,
            as: 'profesor'
          },
          {
            model: Cursos.sequelize.models.Inscripciones,
            as: 'inscripciones'
          }
        ]
      });
      return { success: true, data: cursos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estadísticas de cursos
   */
  async getCursosStats() {
    try {
      const totalCursos = await Cursos.count();
      const cursosConInscripciones = await Cursos.count({
        include: [
          {
            model: Cursos.sequelize.models.Inscripciones,
            as: 'inscripciones'
          }
        ]
      });
      
      const cursosSinInscripciones = totalCursos - cursosConInscripciones;
      
      return {
        success: true,
        data: {
          total: totalCursos,
          conInscripciones: cursosConInscripciones,
          sinInscripciones: cursosSinInscripciones
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener cursos con más estudiantes
   */
  async getCursosMasPopulares(limit = 5) {
    try {
      const cursos = await Cursos.findAll({
        include: [
          {
            model: Cursos.sequelize.models.Inscripciones,
            as: 'inscripciones'
          },
          {
            model: Cursos.sequelize.models.Profesores,
            as: 'profesor'
          }
        ],
        order: [
          [Cursos.sequelize.literal('COUNT(inscripciones.id_inscripcion)'), 'DESC']
        ],
        group: ['Cursos.id_curso', 'profesor.id_profesor'],
        limit
      });
      
      return { success: true, data: cursos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new CursosService();
