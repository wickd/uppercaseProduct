let express = require('express');
let express_app = express();
let config = require('config');
let path = require('path');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let pug = require('pug');
let wrap = require('co').wrap;
let h = require('./libraries/helpers');
let Namespace = require('./libraries/foundation/namespace');
let Application = require('./libraries/foundation/application');

// view engine setup
global.appRoot = path.resolve(__dirname);
// app.locals.basedir = defPath;

express_app.use(passport.initialize());
express_app.use(passport.session());
express_app.use(express.static('public', {maxAge: parseInt(config.route.maxAge*1000)}));

if(! global.__h)
{
    global.__h = h;
} else {
    console.log('Unable to load helpers.');
}

if(! global._namespace)
{
    global._namespace = (new Namespace(appRoot));
} else {
    console.log(`Unable to load namespaces, current value of global _namespace is ${_namespace}`);
}

if(! global.app)
{
    // Application init. Must be in enter point to have access to root path.
    // bind in future some important interfaces
    
    global.app = (new Application(__dirname, express_app));

    // _application.loading();
} else {
    console.log(`Unable to load application, current value of app is ${app}`);
}

config.debug && express_app.use(logger('dev'));

//catch all errors and show them
express_app.use((err, req, res, next) => {
    if ((config.env != 'production') && (err)) {
        throw err
    }
    next();
});

app.boot();

// route was not found
// express_app.use(home.notFound);

// let h = require('./app/dashboard/administrator/helpers');

module.exports = express_app;