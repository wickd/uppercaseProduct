let ServiceProvider = require('./serviceProvider');

class GeneratorsRejectionTracerServiceProvider extends ServiceProvider
{
    /**
     * GeneratorsRejectionTracerServiceProvider constructor
     * 
     * @return GeneratorsRejectionTracerServiceProvider
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
        process.on('unhandledRejection', function(reason, p){
            console.log('Unhandled Rejection')
            console.log(reason)
        });

        process.on('uncaughtException', function(error) {
            console.log('Uncaught Exception')
            console.log(error)
        });
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
}

module.exports = GeneratorsRejectionTracerServiceProvider;