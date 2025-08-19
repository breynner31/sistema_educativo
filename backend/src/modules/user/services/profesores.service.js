const { Profesores } = require('../models');

class ProfesoresService {
  /**
   * Obtener todos los profesores
   */
  async getAllProfesores() {
    try {
      const profesores = await Profesores.findAll({
        include: [
          {
            model: Profesores.sequelize.models.Cursos,
            as: 'cursos',
            attributes: ['id_curso', 'nombre_curso']
          },
          {
            model: Profesores.sequelize.models.Horarios,
            as: 'horarios',
            attributes: ['id_horario', 'dia', 'hora_inicio', 'hora_fin']
          }
        ]
      });
      return { success: true, data: profesores };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener profesor por ID
   */
  async getProfesorById(id) {
    try {
      const profesor = await Profesores.findByPk(id, {
        include: [
          {
            model: Profesores.sequelize.models.Cursos,
            as: 'cursos'
          },
          {
            model: Profesores.sequelize.models.Horarios,
            as: 'horarios'
          }
        ]
      });
      
      if (!profesor) {
        return { success: false, error: 'Profesor no encontrado' };
      }
      
      return { success: true, data: profesor };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nuevo profesor
   */
  async createProfesor(profesorData) {
    try {
      const profesor = await Profesores.create(profesorData);
      return { success: true, data: profesor };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar profesor
   */
  async updateProfesor(id, profesorData) {
    try {
      const profesor = await Profesores.findByPk(id);
      
      if (!profesor) {
        return { success: false, error: 'Profesor no encontrado' };
      }
      
      await profesor.update(profesorData);
      return { success: true, data: profesor };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar profesor
   */
  async deleteProfesor(id) {
    try {
      const profesor = await Profesores.findByPk(id);
      
      if (!profesor) {
        return { success: false, error: 'Profesor no encontrado' };
      }
      
      await profesor.destroy();
      return { success: true, message: 'Profesor eliminado correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Buscar profesores por especialidad
   */
  async getProfesoresByEspecialidad(especialidad) {
    try {
      const profesores = await Profesores.findAll({
        where: { especialidad },
        include: [
          {
            model: Profesores.sequelize.models.Cursos,
            as: 'cursos'
          }
        ]
      });
      return { success: true, data: profesores };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estadísticas de profesores
   */
  async getProfesoresStats() {
    try {
      const totalProfesores = await Profesores.count();
      const profesoresConCursos = await Profesores.count({
        include: [
          {
            model: Profesores.sequelize.models.Cursos,
            as: 'cursos'
          }
        ]
      });
      
      return {
        success: true,
        data: {
          total: totalProfesores,
          conCursos: profesoresConCursos,
          sinCursos: totalProfesores - profesoresConCursos
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new ProfesoresService();
