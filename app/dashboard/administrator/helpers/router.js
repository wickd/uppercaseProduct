/**
 * route helper
 * @param action
 * @returns {function(*, *, *)}
 */
let h = require('../helpers');
let menu = require('../config').get('nav_menu');
let dashboard = require('../../administrator/middlewares/dashboard');

module.exports = (action = null) => {
    /**
     * middleware
     */
    return (req, res, next) => {

        action = req.params.action
            ? req.params.action
            : action;

        if (action == 'dashboard') {
            
            req.session.success = {};
            res.redirect("/dashboard/pages/" + defaultPage())
        }

        return dashboard(req, res, next, action)
    }
};

/**
 * //search for default menu page
 */
let defaultPage = ()=> {
    let defaultPage = (Object.keys(menu)).filter((key)=> menu[key].default === true)[0];
    //if default page was not found - pick first page
    return !defaultPage ? h.first(menu) : defaultPage;
};
