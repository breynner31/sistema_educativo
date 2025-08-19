const express = require('express');
const router = express.Router();
const InscripcionesController = require('../controllers/inscripciones.controller');

// GET /api/inscripciones - Obtener todas las inscripciones
router.get('/', InscripcionesController.getAllInscripciones);

// GET /api/inscripciones/stats - Obtener estadísticas de inscripciones
router.get('/stats', InscripcionesController.getInscripcionesStats);

// GET /api/inscripciones/verificar - Verificar si un estudiante está inscrito
router.get('/verificar', InscripcionesController.isEstudianteInscrito);

// GET /api/inscripciones/fecha - Obtener inscripciones por fecha
router.get('/fecha', InscripcionesController.getInscripcionesByFecha);

// GET /api/inscripciones/estudiante/:estudianteId - Obtener inscripciones por estudiante
router.get('/estudiante/:estudianteId', InscripcionesController.getInscripcionesByEstudiante);

// GET /api/inscripciones/curso/:cursoId - Obtener inscripciones por curso
router.get('/curso/:cursoId', InscripcionesController.getInscripcionesByCurso);

// GET /api/inscripciones/:id - Obtener inscripción por ID
router.get('/:id', InscripcionesController.getInscripcionById);

// POST /api/inscripciones - Crear nueva inscripción
router.post('/', InscripcionesController.createInscripcion);

// PUT /api/inscripciones/:id - Actualizar inscripción
router.put('/:id', InscripcionesController.updateInscripcion);

// DELETE /api/inscripciones/:id - Eliminar inscripción
router.delete('/:id', InscripcionesController.deleteInscripcion);

module.exports = router;
