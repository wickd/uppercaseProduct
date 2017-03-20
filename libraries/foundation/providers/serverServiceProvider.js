let ServiceProvider = require('./serviceProvider');
let config = require('config');

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
        //run server
        this.app().getExpressApplicationInstance()
            .listen(config.get('serverPort'), function () {
                console.log('API listening on port ' + config.get('serverPort') + '!');
            });
    }
}

module.exports = ServerServiceProvider;