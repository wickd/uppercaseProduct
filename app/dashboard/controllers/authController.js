let util = require('util');
let express = require('express');
let app = express();
// let User = require('../../administrator/models/user');

/**
 * Get login page.
 *
 * @param req
 * @param res
 * @returns {json} output
 */
exports.login = (req, res) => {
    res.renderModule('views/auth/login', {});
};

exports.ajaxLogin = (req, res) => {
    if (req.session.user) {
        res.status(200).json({id: req.session.user.id, code: 200});
    }
    else {

        res.sendStatus(400);
    }

}

/**
 * Attempt to login user.
 *
 * @param req
 * @param res
 * @returns {json} output
 */
exports.attemptLogin = (req, res) => {
    console.log('logged in');

    res.redirect(301, '/dashboard');
};

exports.logout = (req, res) => {

    req.logout();

    return res.redirect('dashboard');
};