let passport = require('passport');
let helpers = require.main.require('./helpers');
let defPath = './app/dashboard';

// // default except routes.
let exceptions = [
    "/login",
    "/test"
];

module.exports = (req, res, next, excp = null) => {

    exceptions = helpers.merge(exceptions, excp);

    if (req.user) {
        next();
    } else {
        if(req.path == '/login')
        {
            next();
        }

        res.redirect('/dashboard/login');
    }
};