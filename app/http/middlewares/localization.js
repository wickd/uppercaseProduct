let Translator = require('translator/translator');
let LanguagesRepository = require(_namespace.app_path() + '/repositories/languagesRepository');
const DEFAULT_LOCALE = 'ro';
let Locale = require(_namespace.app_path() + '/dashboard/translatable/locale');

let exceptions = [
    'favicon.ico',
    'dashboard',
    'uploads'
];

module.exports = function * (req, res, next) {
    let locale = req.params.lang;

    for(let i = 0, _count = exceptions.length; i < _count; i++)
    {
        if(locale == exceptions[i])
        {
            return next();
        }
    }

    let languages = yield (new LanguagesRepository()).getPublic();

    let _default_language = languages ? languages.first() : null;

    let _locale_language = languages ? languages.whereRow('slug', locale) : null;

    app.bind('languages', (app) => {
        return languages;
    })

    app.bind('locale', (app) => {
        return (new Locale(null, languages)).setLang(_locale_language);
    })

    if(req.method != 'GET') 
    {
        // le costeliano ...
        if(req.session.lang)
        {
            req.translator = (new Translator(
                req.session.lang, req.originalUrl
            ));
        }

        // skip post, put, delete methods.
        return next();
    }

    if(locale)
    {
        req.session.lang = locale || req.session.lang;

    } else {
        req.session.lang = req.session.lang || _default_language 
            ? _default_language.slug : DEFAULT_LOCALE;    

        if(! req.xhr)
        {
            // redirect for non-ajax requests.

            return res.redirect(`/${req.session.lang}${req.originalUrl}`);
        }
    }

    req.translator = (new Translator(req.session.lang, req.originalUrl));

    return next();
}
