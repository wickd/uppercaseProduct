let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let adminRepository = require.main.require('./app/dashboard/repositories/adminRepository.js');
let AdminRepository = new adminRepository();
let Q = require('bluebird');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {


        AdminRepository
            .getByCredentials(email, password)
            .then(admin => {
                if (admin) {
                    req.session.success = 'You are successfully logged in ' + admin.email + '!';
                } else {
                    req.session.error = 'Could not log user in. Please try again.';
                }


                done(null, admin);
            })
            .catch(err=> {
                console.log(err);
                req.session.error = 'Could not log user in. Please try again.';
                done(null);
            });


    }
));