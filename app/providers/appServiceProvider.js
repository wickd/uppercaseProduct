let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/appServiceProvider');

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
        super.boot();
    }
}

module.exports = AppServiceProvider;