let ServiceProvider = require('./serviceProvider');
let directoriesHelper = require(_namespace.root_path() + '/helpers/directories');
let wrap = require('co').wrap;

class FrontendModuleServiceProvider extends ServiceProvider
{
    /**
     * Get list of folders which shouldn't be loaded.
     *
     * @return {Array}
     */
    getExceptModules()
    {
        return [
            //
        ];
    }

    /**
     * Get path for frontend modules.
     *
     * @return {string}
     */
    getFrontendModulePath()
    {
        return _namespace.app_path() + '/frontend';
    }

    /**
     * FrontendModuleServiceProvider constructor
     * 
     * @return FrontendModuleServiceProvider
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
        this.loadModules();
    }

    /**
     * Load frontend modules handler.
     *
     * @return {Error|undefined}
     */
    loadModules()
    {
        //get all routes by modules
        let modules = directoriesHelper.getDirectories(this.getFrontendModulePath());

        let except_modules = this.getExceptModules();

        for (let i = 0; i < modules.length; i++) 
        {
            let module_path = this.getFrontendModulePath() + `/${modules[i]}`;

            if(this.app().h.exists_in_object(modules[i], except_modules))
            {
                continue;
            }

            try {

                this.app()
                    .getExpressApplicationInstance()
                    .use(`/${modules[i]}`, wrap(require(module_path + "/router")));

            } catch (e) {
                console.log(`Can\'t find router.js in ${module_path}`);
                console.log(e)
            }
        }
    }
}

module.exports = FrontendModuleServiceProvider;