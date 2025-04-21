import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// test connection immediately to confirm DB is up
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('DB Connected!');
    connection.release(); // Release back to pool
  } catch (err: any) {
    console.error('DB connection failed:', err.message);
  }
})();

export default pool;

