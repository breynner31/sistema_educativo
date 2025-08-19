const HorariosService = require('../services/horarios.service');

class HorariosController {
  /**
   * Obtener todos los horarios
   */
  async getAllHorarios(req, res) {
    try {
      const result = await HorariosService.getAllHorarios();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horarios obtenidos correctamente'
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
   * Obtener horario por ID
   */
  async getHorarioById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del horario es requerido'
        });
      }

      const result = await HorariosService.getHorarioById(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horario obtenido correctamente'
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
   * Crear nuevo horario
   */
  async createHorario(req, res) {
    try {
      const { id_curso, id_profesor, dia, hora_inicio, hora_fin } = req.body;
      
      if (!id_curso || !id_profesor || !dia || !hora_inicio || !hora_fin) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_curso, id_profesor, dia, hora_inicio, hora_fin'
        });
      }

      const horarioData = { id_curso, id_profesor, dia, hora_inicio, hora_fin };
      const result = await HorariosService.createHorario(horarioData);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          data: result.data,
          message: 'Horario creado correctamente'
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
   * Actualizar horario
   */
  async updateHorario(req, res) {
    try {
      const { id } = req.params;
      const { id_curso, id_profesor, dia, hora_inicio, hora_fin } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del horario es requerido'
        });
      }

      if (!id_curso && !id_profesor && !dia && !hora_inicio && !hora_fin) {
        return res.status(400).json({
          success: false,
          error: 'Al menos un campo debe ser proporcionado para actualizar'
        });
      }

      const horarioData = {};
      if (id_curso) horarioData.id_curso = id_curso;
      if (id_profesor) horarioData.id_profesor = id_profesor;
      if (dia) horarioData.dia = dia;
      if (hora_inicio) horarioData.hora_inicio = hora_inicio;
      if (hora_fin) horarioData.hora_fin = hora_fin;

      const result = await HorariosService.updateHorario(id, horarioData);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horario actualizado correctamente'
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
   * Eliminar horario
   */
  async deleteHorario(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID del horario es requerido'
        });
      }

      const result = await HorariosService.deleteHorario(id);
      
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
   * Obtener horarios por curso
   */
  async getHorariosByCurso(req, res) {
    try {
      const { cursoId } = req.params;
      
      if (!cursoId) {
        return res.status(400).json({
          success: false,
          error: 'ID del curso es requerido'
        });
      }

      const result = await HorariosService.getHorariosByCurso(cursoId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horarios del curso obtenidos correctamente'
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
   * Obtener horarios por profesor
   */
  async getHorariosByProfesor(req, res) {
    try {
      const { profesorId } = req.params;
      
      if (!profesorId) {
        return res.status(400).json({
          success: false,
          error: 'ID del profesor es requerido'
        });
      }

      const result = await HorariosService.getHorariosByProfesor(profesorId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horarios del profesor obtenidos correctamente'
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
   * Obtener horarios por día
   */
  async getHorariosByDia(req, res) {
    try {
      const { dia } = req.query;
      
      if (!dia) {
        return res.status(400).json({
          success: false,
          error: 'El día es requerido'
        });
      }

      const result = await HorariosService.getHorariosByDia(dia);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horarios del día obtenidos correctamente'
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
   * Obtener horarios por rango de horas
   */
  async getHorariosByRangoHoras(req, res) {
    try {
      const { horaInicio, horaFin } = req.query;
      
      if (!horaInicio || !horaFin) {
        return res.status(400).json({
          success: false,
          error: 'Las horas de inicio y fin son requeridas'
        });
      }

      const result = await HorariosService.getHorariosByRangoHoras(horaInicio, horaFin);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Horarios del rango de horas obtenidos correctamente'
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
   * Obtener estadísticas de horarios
   */
  async getHorariosStats(req, res) {
    try {
      const result = await HorariosService.getHorariosStats();
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Estadísticas de horarios obtenidas correctamente'
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
   * Verificar disponibilidad de horario
   */
  async verificarDisponibilidad(req, res) {
    try {
      const { cursoId, dia, horaInicio, horaFin, horarioId } = req.query;
      
      if (!cursoId || !dia || !horaInicio || !horaFin) {
        return res.status(400).json({
          success: false,
          error: 'Los campos cursoId, dia, horaInicio y horaFin son requeridos'
        });
      }

      const result = await HorariosService.verificarDisponibilidad(
        cursoId, 
        dia, 
        horaInicio, 
        horaFin, 
        horarioId
      );
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data,
          message: 'Disponibilidad verificada correctamente'
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

module.exports = new HorariosController();
