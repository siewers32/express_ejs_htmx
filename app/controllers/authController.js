const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');


// Redirect naar login of dashboard
exports.redirectToLogin = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
};

// Toon loginpagina
exports.showLoginPage = (req, res) => {
    res.render('login', { error: null });
};


// Afhandelen van login
exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findUserByUsername(username);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {         
            req.session.loggedIn = true;
            req.session.username = username;
            res.render('dashboard', {user});
            // res.render('login', { error: 'Je bent nu ingelogd' });
        } else {
            res.render('login', { error: 'Ongeldige gebruikersnaam of wachtwoord!' });
        }
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Er is een probleem opgetreden. Probeer het later opnieuw.' });
    }
};


// Toon dashboardpagina
exports.showDashboard = (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
};

// Afhandelen van uitloggen
exports.handleLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
