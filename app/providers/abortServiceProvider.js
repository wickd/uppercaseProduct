let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/abortServiceProvider');

class AbortServiceProvider extends ServiceProvider
{
    /**
     * Get abort response.
     *
     * @return {string}
     */
    getAbortResponse(req, res, next)
    {
        return res.view('404');
    }

    /**
     * AbortServiceProvider constructor
     * 
     * @return AbortServiceProvider
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

module.exports = AbortServiceProvider;