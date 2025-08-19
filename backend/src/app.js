require('dotenv').config();  // Carga las variables de entorno al principio

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./modules/user/models');

// Middlewares de seguridad para producción y desarrollo
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Importar rutas principales
const apiRoutes = require('./modules/user/routes');

const app = express();

// Helmet: cabeceras de seguridad
app.use(helmet());

// Rate limiting: limita a 100 peticiones por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // máximo de peticiones por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS: permite acceso desde el frontend
app.use(cors({
  origin: true, // Permite todos los orígenes en desarrollo
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

// Sanitización contra XSS
app.use(xss());

// Sanitización contra inyección NoSQL (si usas MongoDB, opcional con Sequelize)
app.use(mongoSanitize());

// Límite de tamaño de payload JSON
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
// Rutas API
app.use('/api', apiRoutes);

// Ruta de prueba de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces

// Inicializar base de datos y servidor
async function iniciarServidor() {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    app.listen(PORT, HOST, () => {
      console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

iniciarServidor();
