const db = require('../../config/db');

// Vind gebruiker op basis van gebruikersnaam
exports.findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    // console.log(rows[0]);
    return rows[0]; // Retourneer de eerste gebruiker als hij bestaat
};