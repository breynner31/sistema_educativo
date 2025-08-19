const express = require('express');
const router = express.Router();
const CursosController = require('../controllers/cursos.controller');

// GET /api/cursos - Obtener todos los cursos
router.get('/', CursosController.getAllCursos);

// GET /api/cursos/stats - Obtener estadísticas de cursos
router.get('/stats', CursosController.getCursosStats);

// GET /api/cursos/populares - Obtener cursos más populares
router.get('/populares', CursosController.getCursosMasPopulares);

// GET /api/cursos/search/nombre - Buscar cursos por nombre
router.get('/search/nombre', CursosController.getCursosByNombre);

// GET /api/cursos/profesor/:profesorId - Obtener cursos por profesor
router.get('/profesor/:profesorId', CursosController.getCursosByProfesor);

// GET /api/cursos/:id - Obtener curso por ID
router.get('/:id', CursosController.getCursoById);

// POST /api/cursos - Crear nuevo curso
router.post('/', CursosController.createCurso);

// PUT /api/cursos/:id - Actualizar curso
router.put('/:id', CursosController.updateCurso);

// DELETE /api/cursos/:id - Eliminar curso
router.delete('/:id', CursosController.deleteCurso);

module.exports = router;
