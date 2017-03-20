/**
 * Auth validator
 * @namespace Auth
 * @module Auth/validator
 * @requires baseValidator.js
 * @requires libraries/facebook.js
 * @requires user/model.js
 * @requires libraries/instagram.js
 */
let validator = require.main.require('./app/baseValidator')


/**
 *Login validator
 * @param {object} req - express request
 * @param {object} res - express response
 * @param {closure} next - next event
 * @returns {closure} next - next event | {object} res - express response
 */
exports.login = (req, res, next) => {
    var rules = {login: 'required|string', password: 'required'}
    var data = req.body;
    var validation = new validator(data, rules)
    if (validation.passes()) {
        next()
    }
    else{
        res.badRequest(validation.errors.all())
    }
};

