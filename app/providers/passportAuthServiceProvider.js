let ServiceProvider = require('./serviceProvider');
let LocalStrategy = require('passport-local').Strategy;
let AdminsRepository = require(_namespace.app_path() + '/repositories/adminsRepository.js');
let passport = require('passport');

class PassportAuthServiceProvider extends ServiceProvider
{
    /**
     * PassportAuthServiceProvider constructor
     * 
     * @return PassportAuthServiceProvider
     */
    constructor(app)
    {
        super(app);
    }

    /**
     * Register the service provider.
     *
     * @return {undefined}
     */
    register()
    {
        this.app().getExpressApplicationInstance()
            .use(passport.initialize());
        this.app().getExpressApplicationInstance()
            .use(passport.session());
            
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
    }

    /**
     * Bootstrap any application services.
     *
     * @return {undefined}
     */
    boot()
    {
        // require(_namespace.config_path() + "/passport");
    }
}

module.exports = PassportAuthServiceProvider;