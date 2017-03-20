let ServiceProvider = require('./serviceProvider');

class AppServiceProvider extends ServiceProvider
{
    /**
     * AppServiceProvider constructor
     * 
     * @return AppServiceProvider
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
        //     
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

module.exports = AppServiceProvider;