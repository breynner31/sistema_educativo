const ProfesoresService = require('../services/profesores.service');

class ProfesoresController {
  /**
   * Obtener todos los profesores
   */
  async getAllProfesores(req, res) {
    try {
      const result = await ProfesoresService.getAllProfesores();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Profesores obtenidos correctamente'
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
   * Obtener profesor por ID
   */
  async getProfesorById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del profesor es requerido'
        });
      }

      const result = await ProfesoresService.getProfesorById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Profesor obtenido correctamente'
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
   * Crear nuevo profesor
   */
  async createProfesor(req, res) {
    try {
      const { nombre, especialidad } = req.body;
      
      if (!nombre) {
        return res.status(400).json({
          success: false,
          error: 'El nombre del profesor es requerido'
        });
      }

      const profesorData = { nombre, especialidad };
      const result = await ProfesoresService.createProfesor(profesorData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Profesor creado correctamente'
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
   * Actualizar profesor
   */
  async updateProfesor(req, res) {
    try {
      const { id } = req.params;
      const { nombre, especialidad } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del profesor es requerido'
        });
      }

      if (!nombre && !especialidad) {
        return res.status(400).json({
          success: false,
          error: 'Al menos un campo debe ser proporcionado para actualizar'
        });
      }

      const profesorData = {};
      if (nombre) profesorData.nombre = nombre;
      if (especialidad) profesorData.especialidad = especialidad;

      const result = await ProfesoresService.updateProfesor(id, profesorData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Profesor actualizado correctamente'
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
   * Eliminar profesor
   */
  async deleteProfesor(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del profesor es requerido'
        });
      }

      const result = await ProfesoresService.deleteProfesor(id);
      
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
   * Buscar profesores por especialidad
   */
  async getProfesoresByEspecialidad(req, res) {
    try {
      const { especialidad } = req.query;
      
      if (!especialidad) {
        return res.status(400).json({
          success: false,
          error: 'La especialidad es requerida'
        });
      }

      const result = await ProfesoresService.getProfesoresByEspecialidad(especialidad);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Profesores filtrados por especialidad correctamente'
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
   * Obtener estadísticas de profesores
   */
  async getProfesoresStats(req, res) {
    try {
      const result = await ProfesoresService.getProfesoresStats();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estadísticas de profesores obtenidas correctamente'
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

module.exports = new ProfesoresController();
