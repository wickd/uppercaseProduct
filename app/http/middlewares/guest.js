let passport = require('passport');
let admin = require.main.require('./app/administrator/models/admin.js');
let adminRepository = require.main.require('./app/dashboard/repositories/adminRepository.js');

module.exports = (req, res, next) => {
    if (req.user) {
        // todo: redirect from config..
        res.redirect('/dashboard/pages/admins');
    } else {
        next();
    }
};