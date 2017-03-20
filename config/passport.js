let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let adminRepository = require.main.require('./app/dashboard/repositories/adminRepository.js');
let AdminRepository = new adminRepository();
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

        AdminRepository.getByCredentials(email, password)
            // .fail(function (err){
            //     console.log(err.body);
            // })
            .done(admin => {
                if (admin) {
                    req.session.success = 'You are successfully logged in ' + admin.email + '!';
                } else {
                    req.session.error = 'Could not log user in. Please try again.';
                }

                done(null, admin);
            });

        return deferred.promise;
    }
));