let ServiceProvider = require('./serviceProvider');
let session = require('express-session');

class SessionServiceProvider extends ServiceProvider
{
    /**
     * SessionServiceProvider constructor
     * 
     * @return SessionServiceProvider
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
        this.app()
            .getExpressApplicationInstance()
            .use(session({
                secret: "silenceisgold",
                resave: true,
                saveUninitialized: false
            }));
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

module.exports = SessionServiceProvider;