let ServiceProvider = require('./serviceProvider');
// let template = require(_namespace.middlewares_path() + '/template');
let pug = require('pug')
let config = require('config').get('route')
let c = require('config')
let h = require(_namespace.app_path() + '/dashboard/administrator/helpers');
let f = require(_namespace.app_path() + '/dashboard/administrator/helpers/functions');
let Option = require(_namespace.app_path() + '/Option');
let Language = require(_namespace.app_path() + '/Language');
let ServicesRepository = require(_namespace.app_path() + '/repositories/servicesRepository');
let SettingsService = require(_namespace.app_path() + '/services/settingsService');
let Locale = require(_namespace.app_path() + '/dashboard/translatable/locale')
let wrap = require('co').wrap;
let _ = require('lodash');

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
        this.servicesRepository = (new ServicesRepository());
    }

    /**
     * Register the service provider.
     *
     * @return {undefined}
     */
    register()
    {
        this.app().bind('view', (app) => { return {}; });

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
    * jadeLoader(req, res, next, view)
    {
        let options = yield (new Option()).getPublic();

        let services = yield this.servicesRepository.getPublic();

        let _renderPug = (view, json = {}, status = null) => 
        {
            req.app.locals.basedir = this.getTemplateFolderPath();

            // let dashboard = global.dashboard.get('settings');

            //default pug config
            json.basedir = req.app.locals.basedir; 
            json.cache = config.cache;
            json.settings = (new SettingsService(options));
            json.languages = app.get('languages');
            json.translator = req.translator;
            json.slug = text => f.slug(text),
            json._ = _,
            json.services = services,
            json.trans = (key, _default = '') => req.translator 
                ? req.translator.trans(key, _default)
                : _default;
            json.route = (url) => {

                if(req.translator && url[0] == '/')
                {
                    return `/${req.translator.getLocale()}${url}`;
                }

                return url;
            }

            let viewData = h.object_merge(this.app().get('view'), json);

            //render
            try {
                let file = pug.renderFile(`${json.basedir}/${view}.pug`, viewData);
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