let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/serverServiceProvider');

class ServerServiceProvider extends ServiceProvider
{
    /**
     * ServerServiceProvider constructor
     * 
     * @return ServerServiceProvider
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

module.exports = ServerServiceProvider;