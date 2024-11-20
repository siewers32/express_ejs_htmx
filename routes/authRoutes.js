const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const homeController = require('../app/controllers/homeController');

// Routes
router.get('/', homeController.showHomePage);
router.get('/login', authController.showLoginPage);
router.post('/login', authController.handleLogin);


router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { 
      username: req.session.username,
      title: "dashboard"
    });
});
router.get('/logout', authController.handleLogout);
router.get('/zomaar', isAuthenticated, homeController.zomaarPage);

module.exports = router;

function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
      return next(); // Als de gebruiker ingelogd is, ga verder met de route
    }
    res.redirect('/login'); // Als de gebruiker niet ingelogd is, redirect naar de loginpagina
}