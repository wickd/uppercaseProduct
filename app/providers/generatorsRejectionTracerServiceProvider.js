let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/generatorsRejectionTracerServiceProvider');

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
        super.register();
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