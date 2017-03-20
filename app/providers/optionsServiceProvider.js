let ServiceProvider = require('./serviceProvider');
let Settings = require(_namespace.app_path() + "/administrator/models/settings");

class OptionsServiceProvider extends ServiceProvider
{
    /**
     * OptionsServiceProvider constructor
     *
     * @return OptionsServiceProvider
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
        (new Settings()).getPublic()
            .then(options => {
                this.app().bind('settings', (app) => {
                    return new SettingsService(options);
                });
            });
    }
}

module.exports = OptionsServiceProvider;