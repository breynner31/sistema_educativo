const { Estudiantes } = require('../models');

class EstudiantesService {
  /**
   * Obtener todos los estudiantes
   */
  async getAllEstudiantes() {
    try {
      const estudiantes = await Estudiantes.findAll({
        include: [
          {
            model: Estudiantes.sequelize.models.Inscripciones,
            as: 'inscripciones',
            include: [
              {
                model: Estudiantes.sequelize.models.Cursos,
                as: 'curso',
                attributes: ['id_curso', 'nombre_curso']
              }
            ]
          }
        ]
      });
      return { success: true, data: estudiantes };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estudiante por ID
   */
  async getEstudianteById(id) {
    try {
      const estudiante = await Estudiantes.findByPk(id, {
        include: [
          {
            model: Estudiantes.sequelize.models.Inscripciones,
            as: 'inscripciones',
            include: [
              {
                model: Estudiantes.sequelize.models.Cursos,
                as: 'curso'
              }
            ]
          }
        ]
      });
      
      if (!estudiante) {
        return { success: false, error: 'Estudiante no encontrado' };
      }
      
      return { success: true, data: estudiante };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nuevo estudiante
   */
  async createEstudiante(estudianteData) {
    try {
      const estudiante = await Estudiantes.create(estudianteData);
      return { success: true, data: estudiante };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Actualizar estudiante
   */
  async updateEstudiante(id, estudianteData) {
    try {
      const estudiante = await Estudiantes.findByPk(id);
      
      if (!estudiante) {
        return { success: false, error: 'Estudiante no encontrado' };
      }
      
      await estudiante.update(estudianteData);
      return { success: true, data: estudiante };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar estudiante
   */
  async deleteEstudiante(id) {
    try {
      const estudiante = await Estudiantes.findByPk(id);
      
      if (!estudiante) {
        return { success: false, error: 'Estudiante no encontrado' };
      }
      
      await estudiante.destroy();
      return { success: true, message: 'Estudiante eliminado correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Buscar estudiantes por nombre
   */
  async getEstudiantesByNombre(nombre) {
    try {
      const estudiantes = await Estudiantes.findAll({
        where: {
          nombre: {
            [Estudiantes.sequelize.Op.iLike]: `%${nombre}%`
          }
        },
        include: [
          {
            model: Estudiantes.sequelize.models.Inscripciones,
            as: 'inscripciones'
          }
        ]
      });
      return { success: true, data: estudiantes };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Buscar estudiante por email
   */
  async getEstudianteByEmail(email) {
    try {
      const estudiante = await Estudiantes.findOne({
        where: { email },
        include: [
          {
            model: Estudiantes.sequelize.models.Inscripciones,
            as: 'inscripciones'
          }
        ]
      });
      
      if (!estudiante) {
        return { success: false, error: 'Estudiante no encontrado' };
      }
      
      return { success: true, data: estudiante };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estadísticas de estudiantes
   */
  async getEstudiantesStats() {
    try {
      const totalEstudiantes = await Estudiantes.count();
      const estudiantesInscritos = await Estudiantes.count({
        include: [
          {
            model: Estudiantes.sequelize.models.Inscripciones,
            as: 'inscripciones'
          }
        ]
      });
      
      const estudiantesSinInscripcion = totalEstudiantes - estudiantesInscritos;
      
      return {
        success: true,
        data: {
          total: totalEstudiantes,
          inscritos: estudiantesInscritos,
          sinInscripcion: estudiantesSinInscripcion
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Obtener estudiantes por fecha de registro
   */
  async getEstudiantesByFechaRegistro(fechaInicio, fechaFin) {
    try {
      const estudiantes = await Estudiantes.findAll({
        where: {
          fecha_registro: {
            [Estudiantes.sequelize.Op.between]: [fechaInicio, fechaFin]
          }
        }
      });
      return { success: true, data: estudiantes };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EstudiantesService();
