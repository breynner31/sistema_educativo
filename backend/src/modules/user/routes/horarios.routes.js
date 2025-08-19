const express = require('express');
const router = express.Router();
const HorariosController = require('../controllers/horarios.controller');

// GET /api/horarios - Obtener todos los horarios
router.get('/', HorariosController.getAllHorarios);

// GET /api/horarios/stats - Obtener estadísticas de horarios
router.get('/stats', HorariosController.getHorariosStats);

// GET /api/horarios/disponibilidad - Verificar disponibilidad de horario
router.get('/disponibilidad', HorariosController.verificarDisponibilidad);

// GET /api/horarios/dia - Obtener horarios por día
router.get('/dia', HorariosController.getHorariosByDia);

// GET /api/horarios/rango-horas - Obtener horarios por rango de horas
router.get('/rango-horas', HorariosController.getHorariosByRangoHoras);

// GET /api/horarios/curso/:cursoId - Obtener horarios por curso
router.get('/curso/:cursoId', HorariosController.getHorariosByCurso);

// GET /api/horarios/profesor/:profesorId - Obtener horarios por profesor
router.get('/profesor/:profesorId', HorariosController.getHorariosByProfesor);

// GET /api/horarios/:id - Obtener horario por ID
router.get('/:id', HorariosController.getHorarioById);

// POST /api/horarios - Crear nuevo horario
router.post('/', HorariosController.createHorario);

// PUT /api/horarios/:id - Actualizar horario
router.put('/:id', HorariosController.updateHorario);

// DELETE /api/horarios/:id - Eliminar horario
router.delete('/:id', HorariosController.deleteHorario);

module.exports = router;
