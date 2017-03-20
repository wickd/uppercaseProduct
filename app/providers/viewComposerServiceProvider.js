let ServiceProvider = require(_namespace.core_path() + '/foundation/providers/viewComposerServiceProvider');

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * ViewComposerServiceProvider constructor
     * 
     * @return ViewComposerServiceProvider
     */
    constructor(app)
    {
        super(app);
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

module.exports = ViewComposerServiceProvider;