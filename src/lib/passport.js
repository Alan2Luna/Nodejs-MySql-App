const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require = ('../lib/helpers')

// local.signup es el nombre de la autentificacion
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        // username: username === A solo tener username
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptássword(passport);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.inserId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM user where id = ?', [id]);
    done(null, rows[0]);
})