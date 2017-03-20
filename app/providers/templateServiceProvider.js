let ServiceProvider = require('./serviceProvider');
// let template = require(_namespace.middlewares_path() + '/template');
let pug = require('pug')
let config = require('config').get('route')
let c = require('config')
let h = require(_namespace.app_path() + '/dashboard/administrator/helpers');
let Settings = require(_namespace.app_path() + '/settings');
let SettingsService = require(_namespace.app_path() + '/services/settingsService');
let wrap = require('co').wrap;

class TemplateServiceProvider extends ServiceProvider
{
    /**
     * TemplateServiceProvider constructor
     * 
     * @return TemplateServiceProvider
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
    	this.app().getExpressApplicationInstance()
            // .set('view engine', c.get('template.view_engine'));
    		.set('view engine', 'pug');

     	this.app().bind('templater', (req, res, next) => this.jadeLoader(req, res, next), false);
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
     * Get template folder path.
     *
     * @return {string}
     */
    getTemplateFolderPath()
    {
        // todo: change on _namespace.root_path() + c.get('template.path')
        return _namespace.resources_path() + '/views';
    }

    /**
     * Template jade, pug loader.
     *
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @return {Response}
     */
    * jadeLoader(req, res, next, provider)
    {
        // ? provider 
        // let options = yield (new Settings()).getPublic();

        let _renderPug = (view, json = {}, status = null) => 
        {
            req.app.locals.basedir = this.getTemplateFolderPath();

            // let dashboard = global.dashboard.get('settings');

            //default pug config
            json.basedir = req.app.locals.basedir; 
            json.cache = config.cache;
            // json.settings = (new SettingsService(options));

            //render
            try {
                let file = pug.renderFile(`${json.basedir}/${view}.pug`, json);
                //status and output
                status && res.status(status);
                res.send(file);
            }
            catch (e) {
                console.log(e);
                res.send(e);
                // next()
            }
        };

        if(! res.view)
        {
            res.view = _renderPug;
        } else {
            // todo: rework...
            console.log('res.view is used, used renderModule instead');

            res.renderModule = _renderPug;
        }

        return next();
    }
}

module.exports = TemplateServiceProvider;