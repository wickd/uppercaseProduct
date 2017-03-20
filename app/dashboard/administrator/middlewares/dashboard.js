let promise = require('bluebird');
let h = require('../helpers');
let defPath = './app/dashboard';
let config = require('../config');
let Scheduler = require('../scheduler');
let authorized_msg = 'Authorized.';

module.exports = (req, res, next, action) => {

    req.app.locals.basedir = defPath;
    req.action = action;

    if (!h.empty(req.params) && !h.isUndef(req.params.page)) {

    let page = req.params.page;

        let schedule = {};

        //module probe
        try {
            schedule = require.main.require(config.get('dashboard.crud_path') + page)
        }
        catch (e) {
           console.log(e);
        }

        let moduler = new Scheduler(
            {
                title: page,
                schedule: schedule
            }, true
        );

        let validations = moduler.getValidationScheduleList();


        if (h.isset(validations) && !h.empty(validations)) {

            switch (typeof validations) {
                case 'function':
                    let result = validations(req, res, next, action, page);


                    if (h.is_bool(result)) {
                        if (!result) {
                            res.send(authorized_msg);
                        }
                    } else {
                        return result;
                    }

                    break;
                case 'object':
                    if (h.object_key_exists(action, validations)) {
                        let actionValidator = validations[action];

                        switch (typeof actionValidator) {
                            case 'function':
                                let result = actionValidator(req, res, next, action, page);

                                if (h.is_bool(result)) {
                                    if (!result) {
                                        res.send(authorized_msg);
                                    }
                                } else {
                                    return result;
                                }
                                break;
                            case 'boolean':
                                if (!actionValidator) {
                                    res.send(authorized_msg);
                                }

                                break;
                            default :
                                if (!Boolean(actionValidator)) {
                                    res.send(authorized_msg);
                                }

                                break;
                        }
                    }
                    break;
                case 'boolean':
                    if (!validations) {
                        res.send(authorized_msg);
                    }

                    break;

                default :
                    if (!Boolean(validations)) {
                        res.send(authorized_msg);
                    }

                    break;
            }
        }
        else{

        }
    }

    next();
};