let ServiceProvider = require('./serviceProvider');
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
        this.app().getExpressApplicationInstance()
            .use(this.app().getExpressApplicationInstance()
                .static('public', {maxAge: parseInt(config.route.maxAge*1000)})
            );
    }

    /**
     * Bootstrap any application services.
     *
     * @return {undefined}
     */
    boot()
    {
        //
    }
}

module.exports = PassportAuthServiceProvider;