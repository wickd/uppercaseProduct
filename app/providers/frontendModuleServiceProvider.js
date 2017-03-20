let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/frontendModuleServiceProvider');

class FrontendModuleServiceProvider extends ServiceProvider
{
    /**
     * Get list of folders which shouldn't be loaded.
     *
     * @return {Array}
     */
    getExceptModules()
    {
        return [
            //
        ];
    }

    /**
     * Get path for frontend modules.
     *
     * @return {string}
     */
    getFrontendModulePath()
    {
        return _namespace.app_path() + '/frontend';
    }

    /**
     * FrontendModuleServiceProvider constructor
     * 
     * @return FrontendModuleServiceProvider
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

module.exports = FrontendModuleServiceProvider;