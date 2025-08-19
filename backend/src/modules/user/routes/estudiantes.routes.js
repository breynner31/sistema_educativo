const express = require('express');
const router = express.Router();
const EstudiantesController = require('../controllers/estudiantes.controller');

// GET /api/estudiantes - Obtener todos los estudiantes
router.get('/', EstudiantesController.getAllEstudiantes);

// GET /api/estudiantes/stats - Obtener estadísticas de estudiantes
router.get('/stats', EstudiantesController.getEstudiantesStats);

// GET /api/estudiantes/search/nombre - Buscar estudiantes por nombre
router.get('/search/nombre', EstudiantesController.getEstudiantesByNombre);

// GET /api/estudiantes/search/email - Buscar estudiante por email
router.get('/search/email', EstudiantesController.getEstudianteByEmail);

// GET /api/estudiantes/search/fecha - Buscar estudiantes por fecha de registro
router.get('/search/fecha', EstudiantesController.getEstudiantesByFechaRegistro);

// GET /api/estudiantes/:id - Obtener estudiante por ID
router.get('/:id', EstudiantesController.getEstudianteById);

// POST /api/estudiantes - Crear nuevo estudiante
router.post('/', EstudiantesController.createEstudiante);

// PUT /api/estudiantes/:id - Actualizar estudiante
router.put('/:id', EstudiantesController.updateEstudiante);

// DELETE /api/estudiantes/:id - Eliminar estudiante
router.delete('/:id', EstudiantesController.deleteEstudiante);

module.exports = router;
