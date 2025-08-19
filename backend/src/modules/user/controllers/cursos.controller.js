const CursosService = require('../services/cursos.service');

class CursosController {
  /**
   * Obtener todos los cursos
   */
  async getAllCursos(req, res) {
    try {
      const result = await CursosService.getAllCursos();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Cursos obtenidos correctamente'
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
   * Obtener curso por ID
   */
  async getCursoById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del curso es requerido'
        });
      }

      const result = await CursosService.getCursoById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Curso obtenido correctamente'
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
   * Crear nuevo curso
   */
  async createCurso(req, res) {
    try {
      const { nombre_curso, id_profesor } = req.body;
      
      if (!nombre_curso || !id_profesor) {
        return res.status(400).json({
          success: false,
          error: 'El nombre del curso y el ID del profesor son requeridos'
        });
      }

      const cursoData = { nombre_curso, id_profesor };
      const result = await CursosService.createCurso(cursoData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Curso creado correctamente'
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
   * Actualizar curso
   */
  async updateCurso(req, res) {
    try {
      const { id } = req.params;
      const { nombre_curso, id_profesor } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del curso es requerido'
        });
      }

      if (!nombre_curso && !id_profesor) {
        return res.status(400).json({
          success: false,
          error: 'Al menos un campo debe ser proporcionado para actualizar'
        });
      }

      const cursoData = {};
      if (nombre_curso) cursoData.nombre_curso = nombre_curso;
      if (id_profesor) cursoData.id_profesor = id_profesor;

      const result = await CursosService.updateCurso(id, cursoData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Curso actualizado correctamente'
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
   * Eliminar curso
   */
  async deleteCurso(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del curso es requerido'
        });
      }

      const result = await CursosService.deleteCurso(id);
      
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
   * Buscar cursos por nombre
   */
  async getCursosByNombre(req, res) {
    try {
      const { nombre } = req.query;
      
      if (!nombre) {
        return res.status(400).json({
          success: false,
          error: 'El nombre del curso es requerido'
        });
      }

      const result = await CursosService.getCursosByNombre(nombre);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Cursos filtrados por nombre correctamente'
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
   * Obtener cursos por profesor
   */
  async getCursosByProfesor(req, res) {
    try {
      const { profesorId } = req.params;
      
      if (!profesorId) {
        return res.status(400).json({
          success: false,
          error: 'ID del profesor es requerido'
        });
      }

      const result = await CursosService.getCursosByProfesor(profesorId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Cursos del profesor obtenidos correctamente'
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
   * Obtener estadísticas de cursos
   */
  async getCursosStats(req, res) {
    try {
      const result = await CursosService.getCursosStats();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estadísticas de cursos obtenidas correctamente'
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
   * Obtener cursos más populares
   */
  async getCursosMasPopulares(req, res) {
    try {
      const { limit } = req.query;
      const limitNumber = limit ? parseInt(limit) : 5;

      const result = await CursosService.getCursosMasPopulares(limitNumber);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Cursos más populares obtenidos correctamente'
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

module.exports = new CursosController();
