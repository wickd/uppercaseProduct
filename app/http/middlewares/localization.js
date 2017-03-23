let Translator = require('translator/translator');
const DEFAULT_LOCALE = 'en';

let exceptions = [
    'favicon.ico'
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

        req.session.lang = req.session.lang || DEFAULT_LOCALE;    

        if(! req.xhr)
        {
            // redirect for non-ajax requests.

            return res.redirect(`/${req.session.lang}${req.originalUrl}`);
        }
    }

    req.translator = (new Translator(req.session.lang, req.originalUrl));

    return next();
}
