let co = require('co');
let App = require('./app');
let c = require('../administrator/config');
let h = require('../administrator/helpers');

let Settings = require('./settings');
let Locale = require('../translatable/locale');
let Scheduler = require('../administrator/scheduler');
let Navigation = require('../administrator/navigation');
let FormBuilder = require('../administrator/form/builder');
let Translatable = require('../translatable/translatable');
let SettingsModel = require(_namespace.app_path() + '/Option');
let LanguageRepository = require('../repositories/languageRepository');

module.exports = (req, res, next) => co(function *() {

    let page = req.params.page;

    // and check if req.dashboard is setted, so it does not a instanceof App
    // && ! (req.dashboard instanceof App)
    if(! h.isset(req.dashboard) || req.dashboard instanceof App)
    {
        let app = new App(page, req);

        // todo: find better way to access globally dashboard application.
        global.dashboard = app;

        app.bind('schedule', (app) => {
            try {
                let moduler = require.main.require(c.get('dashboard.crud_path') + app.page);

                return new Scheduler({ title: app.page, schedule: moduler });
            } catch (e) {
                console.log('Filed to load schedule list.');
                console.log(e);

                return null;
            }
        });

        app.bind('navigation', (app) => {
            let navigation = new Navigation();

            if (app.page) {
                navigation
                    .setCurrentPage(app.page)
                    .setCurrentModulePage(app.get('schedule'));
            }

            return navigation;
        });

        app.bind('schedule_model', (app) => {
            return new (app.get('schedule').getModel());
        });

        app.bind('builder', (app) => {
            return new FormBuilder(app.get('schedule').getEditableFields());
        });

        if(c.get('dashboard.multilingual', true))
        {
            let languages = yield (new LanguageRepository()).getPublic();

            app.bind('languages', (app) => {
                return languages;
            });

            app.bind('locale', (app) => {
                let locale = new Locale();

                return locale.setLang(locale.getDefaultLanguage());
            });
        }

        let options = yield (new SettingsModel()).getPublic();

        app.bind('settings', (app) => {
            return new Settings(options);
        });

        next();

    } else {
        console.log('Dashboard application loading failed.');

        res.send(404);
        // throw new Error('Dashboard application loading failed.');
    }
}).catch(err =>
    console.log(err)
);