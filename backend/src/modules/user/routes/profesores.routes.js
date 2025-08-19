const express = require('express');
const router = express.Router();
const ProfesoresController = require('../controllers/profesores.controller');

// GET /api/profesores - Obtener todos los profesores
router.get('/', ProfesoresController.getAllProfesores);

// GET /api/profesores/stats - Obtener estadísticas de profesores
router.get('/stats', ProfesoresController.getProfesoresStats);

// GET /api/profesores/search - Buscar profesores por especialidad
router.get('/search', ProfesoresController.getProfesoresByEspecialidad);

// GET /api/profesores/:id - Obtener profesor por ID
router.get('/:id', ProfesoresController.getProfesorById);

// POST /api/profesores - Crear nuevo profesor
router.post('/', ProfesoresController.createProfesor);

// PUT /api/profesores/:id - Actualizar profesor
router.put('/:id', ProfesoresController.updateProfesor);

// DELETE /api/profesores/:id - Eliminar profesor
router.delete('/:id', ProfesoresController.deleteProfesor);

module.exports = router;
