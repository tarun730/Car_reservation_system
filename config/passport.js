
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const con = require('./DB_connection')

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {

        done(null, user.id);
    });

    
    passport.deserializeUser(function (id, done) {
        con.query("select * from carres.user where id = " + id, function (err, rows) {

            done(err, rows[0]);
        });
    });


    
    passport.use('local-admin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            con.query("SELECT * FROM `carres`.`admin` WHERE `email` = '" + email + "'", function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!(rows[0].password == password))
                    return done(null, false); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user

                return done(null, rows[0]);

            });



        }));













    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            con.query("SELECT * FROM `carres`.`user` WHERE `email` = '" + email + "'", function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!(rows[0].password == password))
                    return done(null, false); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user

                return done(null, rows[0]);

            });



        }));


};


passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }


    return res.redirect('/')
}
passport.setAuthenticatedUser = function (req, res, next) {

    if (req.isAuthenticated()) {
        res.locals.user = req.user


    }


    next()
}










