let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let AdminsRepository = require(_namespace.app_path() + '/repositories/adminsRepository.js');
let Q = require('q');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
}, (req, email, password, done) => {
    var deferred = Q.defer();

    (new AdminsRepository()).getByCredentials(email, password)
        .done(admin => {
            if (admin) {
                req.session.success = 'You are successfully logged in ' + admin.email + '!';
            } else {
                req.session.error = 'Could not log user in. Please try again.';
            }

            done(null, admin);
        });

    return deferred.promise;    
}));