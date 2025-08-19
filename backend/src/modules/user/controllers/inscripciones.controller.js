const InscripcionesService = require('../services/inscripciones.service');

class InscripcionesController {
  /**
   * Obtener todas las inscripciones
   */
  async getAllInscripciones(req, res) {
    try {
      const result = await InscripcionesService.getAllInscripciones();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripciones obtenidas correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Obtener inscripción por ID
   */
  async getInscripcionById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de la inscripción es requerido'
        });
      }

      const result = await InscripcionesService.getInscripcionById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripción obtenida correctamente'
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Crear nueva inscripción
   */
  async createInscripcion(req, res) {
    try {
      const { id_estudiante, id_curso } = req.body;
      
      if (!id_estudiante || !id_curso) {
        return res.status(400).json({
          success: false,
          error: 'El ID del estudiante y el ID del curso son requeridos'
        });
      }

      const inscripcionData = { id_estudiante, id_curso };
      const result = await InscripcionesService.createInscripcion(inscripcionData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Inscripción creada correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Actualizar inscripción
   */
  async updateInscripcion(req, res) {
    try {
      const { id } = req.params;
      const { id_estudiante, id_curso } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de la inscripción es requerido'
        });
      }

      if (!id_estudiante && !id_curso) {
        return res.status(400).json({
          success: false,
          error: 'Al menos un campo debe ser proporcionado para actualizar'
        });
      }

      const inscripcionData = {};
      if (id_estudiante) inscripcionData.id_estudiante = id_estudiante;
      if (id_curso) inscripcionData.id_curso = id_curso;

      const result = await InscripcionesService.updateInscripcion(id, inscripcionData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripción actualizada correctamente'
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Eliminar inscripción
   */
  async deleteInscripcion(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de la inscripción es requerido'
        });
      }

      const result = await InscripcionesService.deleteInscripcion(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Obtener inscripciones por estudiante
   */
  async getInscripcionesByEstudiante(req, res) {
    try {
      const { estudianteId } = req.params;
      
      if (!estudianteId) {
        return res.status(400).json({
          success: false,
          error: 'ID del estudiante es requerido'
        });
      }

      const result = await InscripcionesService.getInscripcionesByEstudiante(estudianteId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripciones del estudiante obtenidas correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Obtener inscripciones por curso
   */
  async getInscripcionesByCurso(req, res) {
    try {
      const { cursoId } = req.params;
      
      if (!cursoId) {
        return res.status(400).json({
          success: false,
          error: 'ID del curso es requerido'
        });
      }

      const result = await InscripcionesService.getInscripcionesByCurso(cursoId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripciones del curso obtenidas correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Obtener estadísticas de inscripciones
   */
  async getInscripcionesStats(req, res) {
    try {
      const result = await InscripcionesService.getInscripcionesStats();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estadísticas de inscripciones obtenidas correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Verificar si un estudiante está inscrito en un curso
   */
  async isEstudianteInscrito(req, res) {
    try {
      const { estudianteId, cursoId } = req.query;
      
      if (!estudianteId || !cursoId) {
        return res.status(400).json({
          success: false,
          error: 'El ID del estudiante y el ID del curso son requeridos'
        });
      }

      const result = await InscripcionesService.isEstudianteInscrito(estudianteId, cursoId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Verificación de inscripción realizada correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  /**
   * Obtener inscripciones por fecha
   */
  async getInscripcionesByFecha(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({
          success: false,
          error: 'Las fechas de inicio y fin son requeridas'
        });
      }

      const result = await InscripcionesService.getInscripcionesByFecha(
        new Date(fechaInicio), 
        new Date(fechaFin)
      );
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Inscripciones filtradas por fecha correctamente'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }
}

module.exports = new InscripcionesController();
