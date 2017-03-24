let ServiceProvider = require(_namespace.library_path() + '/foundation/providers/routeServiceProvider');
let wrap = require('co').wrap;
let localization = require(_namespace.middlewares_path() + '/localization');
let web = require(_namespace.routes_path() + '/web');
let api = require(_namespace.routes_path() + '/api');

class RouteServiceProvider extends ServiceProvider
{
    /**
     * RouteServiceProvider constructor
     * 
     * @return RouteServiceProvider
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
        // Todo: build every route as a instance and make them generator.

        // this.app().bind('routes', (app) => []);

        // this.app().getExpressApplicationInstance()
        //     .use(wrap(this.app().get('templater')));

        this.app().getExpressApplicationInstance()
            .use('/dashboard', require(_namespace.app_path() + '/dashboard/router')); 

        this.app().getExpressApplicationInstance()
            .use('/api', [wrap(this.app().get('templater'))], wrap(api));

        // Load web routes.
        this.app().getExpressApplicationInstance()
            .use('/:lang?/', [
                wrap(localization), 
                wrap(this.app().get('templater'))
            ], wrap(web));
	}
}

module.exports = RouteServiceProvider;