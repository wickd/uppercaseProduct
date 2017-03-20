let ServiceProvider = require('./serviceProvider');

class AbortServiceProvider extends ServiceProvider
{
    /**
     * Get abort response.
     *
     * @return {string}
     */
    getAbortResponse(req, res, next)
    {
        return res.send('404, Not found page.');
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
    	this.app().getExpressApplicationInstance()
    		// .use(this.abort());
    		.use((req, res, next) => this.abort(req, res, next));
    }

    /**
     * Abort application.
     *
     * @return {HttpResponse}
     */
    abort(req, res, next)
    {
        return this.getAbortResponse(req, res, next);
    }
}

module.exports = AbortServiceProvider;