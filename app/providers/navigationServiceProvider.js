let ServiceProvider = require('./serviceProvider');

class NavigationServiceProvider extends ServiceProvider
{
    /**
     * NavigationServiceProvider constructor
     * 
     * @return NavigationServiceProvider
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
    	this.app().bind('navigation', this.getNavigationMenu())
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

    /**
     * Get navigation menu pages.
     *
     * @return {Array}
     */
    getNavigationMenu()
    {
    	return [ 'about', 'services', 'portfolio', 'careers', 'contact' ];
    }
}

module.exports = NavigationServiceProvider;