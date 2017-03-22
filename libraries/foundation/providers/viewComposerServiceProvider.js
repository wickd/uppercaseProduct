let ServiceProvider = require('./serviceProvider');

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
        if(this.compose)
        {
            this.compose(this.app().get('view'));
        }

        // this.app().get('view')
    }
}

module.exports = ViewComposerServiceProvider;