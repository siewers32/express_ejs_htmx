const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./config/sessionConfig');
const authRoutes = require('./routes/authRoutes');
const path = require('path') ;
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views')); // Set custom views directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));

// Routes
app.use('/', authRoutes);
app.use('/zomaar', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })
// Fallback voor 404-pagina's
app.use((req, res) => {
    res.status(404).render('error', { message: 'Pagina niet gevonden!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
