const EstudiantesService = require('../services/estudiantes.service');

class EstudiantesController {
  /**
   * Obtener todos los estudiantes
   */
  async getAllEstudiantes(req, res) {
    try {
      const result = await EstudiantesService.getAllEstudiantes();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiantes obtenidos correctamente'
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
   * Obtener estudiante por ID
   */
  async getEstudianteById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del estudiante es requerido'
        });
      }

      const result = await EstudiantesService.getEstudianteById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiante obtenido correctamente'
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
   * Crear nuevo estudiante
   */
  async createEstudiante(req, res) {
    try {
      const { nombre, email, fecha_registro } = req.body;
      
      if (!nombre || !email) {
        return res.status(400).json({
          success: false,
          error: 'El nombre y email del estudiante son requeridos'
        });
      }

      const estudianteData = { 
        nombre, 
        email, 
        fecha_registro: fecha_registro || new Date() 
      };
      
      const result = await EstudiantesService.createEstudiante(estudianteData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Estudiante creado correctamente'
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
   * Actualizar estudiante
   */
  async updateEstudiante(req, res) {
    try {
      const { id } = req.params;
      const { nombre, email, fecha_registro } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del estudiante es requerido'
        });
      }

      if (!nombre && !email && !fecha_registro) {
        return res.status(400).json({
          success: false,
          error: 'Al menos un campo debe ser proporcionado para actualizar'
        });
      }

      const estudianteData = {};
      if (nombre) estudianteData.nombre = nombre;
      if (email) estudianteData.email = email;
      if (fecha_registro) estudianteData.fecha_registro = fecha_registro;

      const result = await EstudiantesService.updateEstudiante(id, estudianteData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiante actualizado correctamente'
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
   * Eliminar estudiante
   */
  async deleteEstudiante(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del estudiante es requerido'
        });
      }

      const result = await EstudiantesService.deleteEstudiante(id);
      
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
   * Buscar estudiantes por nombre
   */
  async getEstudiantesByNombre(req, res) {
    try {
      const { nombre } = req.query;
      
      if (!nombre) {
        return res.status(400).json({
          success: false,
          error: 'El nombre es requerido'
        });
      }

      const result = await EstudiantesService.getEstudiantesByNombre(nombre);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiantes filtrados por nombre correctamente'
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
   * Buscar estudiante por email
   */
  async getEstudianteByEmail(req, res) {
    try {
      const { email } = req.query;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'El email es requerido'
        });
      }

      const result = await EstudiantesService.getEstudianteByEmail(email);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiante encontrado correctamente'
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
   * Obtener estadísticas de estudiantes
   */
  async getEstudiantesStats(req, res) {
    try {
      const result = await EstudiantesService.getEstudiantesStats();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estadísticas de estudiantes obtenidas correctamente'
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
   * Obtener estudiantes por fecha de registro
   */
  async getEstudiantesByFechaRegistro(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({
          success: false,
          error: 'Las fechas de inicio y fin son requeridas'
        });
      }

      const result = await EstudiantesService.getEstudiantesByFechaRegistro(
        new Date(fechaInicio), 
        new Date(fechaFin)
      );
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estudiantes filtrados por fecha correctamente'
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

module.exports = new EstudiantesController();
