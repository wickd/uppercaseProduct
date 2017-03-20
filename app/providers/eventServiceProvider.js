let ServiceProvider = require('./serviceProvider');

class EventServiceProvider extends ServiceProvider
{
    /**
     * EventServiceProvider constructor
     * 
     * @return EventServiceProvider
     */
    constructor()
    {
        super();
    }

    /**
     * Register the service provider.
     *
     * @return {null}
     */
    register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * 
     */
    boot()
    {

    }
}

module.exports = EventServiceProvider;