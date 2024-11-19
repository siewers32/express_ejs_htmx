const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Maak een verbinding met de database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'express_mvc_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise(); // Gebruik promise-gebaseerde API
