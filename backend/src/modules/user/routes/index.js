const express = require('express');
const router = express.Router();

// Importar todas las rutas
const profesoresRoutes = require('./profesores.routes');
const estudiantesRoutes = require('./estudiantes.routes');
const cursosRoutes = require('./cursos.routes');
const inscripcionesRoutes = require('./inscripciones.routes');
const horariosRoutes = require('./horarios.routes');

// Configurar las rutas con prefijos
router.use('/profesores', profesoresRoutes);
router.use('/estudiantes', estudiantesRoutes);
router.use('/cursos', cursosRoutes);
router.use('/inscripciones', inscripcionesRoutes);
router.use('/horarios', horariosRoutes);

// Ruta de prueba para verificar que la API funciona
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API del Sistema Educativo funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      profesores: '/api/profesores',
      estudiantes: '/api/estudiantes',
      cursos: '/api/cursos',
      inscripciones: '/api/inscripciones',
      horarios: '/api/horarios'
    }
  });
});

module.exports = router;
