import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: '189.197.187.187',
  user: 'umoodle',
  password: 'Umoodl@2024$',
  database: 'alumnos',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
