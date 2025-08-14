const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sistema_educativo',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sistemaEducativo123456#',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a PostgreSQL establecida correctamente');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
    return false;
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
  testConnection
}; 