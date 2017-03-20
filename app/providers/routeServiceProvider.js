let ServiceProvider = require(_namespace.library_path() + '/foundation/providers/routeServiceProvider');
let wrap = require('co').wrap;
let baseRouter = require(_namespace.app_path() + '/baseRouter');

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
        this.app().getExpressApplicationInstance()
            .use(wrap(this.app().get('templater')));

        this.app().getExpressApplicationInstance()
            // .use('/', [wrap(template)], wrap(baseRouter));
            .use('/', [], wrap(baseRouter));

		// this.app().getExpressApplicationInstance()
  //           .use('/dashboard', require(_namespace.app_path() + '/dashboard/router')); 
	}
}

module.exports = RouteServiceProvider;