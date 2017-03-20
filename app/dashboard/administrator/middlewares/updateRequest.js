let config = require('../config');
let Scheduler = require('../scheduler');
let h = require('../helpers');
let Validator = require.main.require('./app/baseValidator');

class UpdateRequest {

    constructor(req, res, $next)
    {
        this.request = req;
        this.res = res;
        this.next = $next;
        this.previousUrl = this.request.header('Referer') || '/';
        this.validation = {};
        this.request.session.errors = [];
        this.params = this.request.params;
        this.schedule = this.loadSchematicSchedule();
        req.schedule = this.schedule;
        req.priveousUrl = this.previousUrl;
        this.input = this.request.body;
        this.rules = this.parseRules(this.getRules());

        if(h.isset(this.rules)) {
            this.validateInputs();
        }
    }

    /**
     * clear errors
     */
    static clear()
    {
        this.validation = {};
        this.request.session.errors = [];
    }

    /**
     * Optimize load schedule, without columns etc.
     *
     * @return {Scheduler}
     */
    loadSchematicSchedule()
    {
        let schedule = require.main.require(
            config.get('dashboard.crud_path') + this.params.page
        );

        return new Scheduler({title: this.params.page, schedule: schedule}, true)
    }

    /**
     * Get schedule's rules.
     *
     * @return {*}
     */
    getRules()
    {
        let rules = this.schedule.getRulesScheduleList();

        return h.isset(rules) ? rules : {};
    }

    /**
     * Parse rules.
     *
     * @param rules
     * @return {*}
     */
    parseRules(rules)
    {
        if(h.isset(rules))
        {
            if(h.is_callable(rules))
            {
                return rules(this.params.id);
            }

            rules = h.object_map(rule => {
                if(h.is_callable(rule))
                {
                    rule = rule(this.params.id);
                }

                return rule;
            }, rules);
        }

        return rules;
    }

    /**
     * Validator.
     *
     * @return {UpdateRequest}
     */
    validateInputs()
    {
        this.validation =  new Validator(this.input, this.rules);

        this.validation.checkAsync(() => {
            return this.next();
        }, () => {
            this.request.session.errors = this.errors();
            return this.res.redirect(this.previousUrl);
        });

        return this;
    }

    /**
     * Check if validation failed.
     *
     * @return {boolean}
     */
    failed()
    {
        return ! Boolean(this.validation.passes());
    }

    /**
     * Get validation errors.
     *
     * @return {*|Object}
     */
    errors()
    {
        return this.validation.errors.all();
    }

    /**
     * Check if request has validation errors.
     *
     * @return {boolean}
     */
    hasErrors()
    {
        return h.empty(this.errors());
    }

    badRequest()
    {
        let errors = this.errors();
        let response = {
            errors: []
        };

        let errorsString = '';

        for(var key in errors) {
            response.errors.push({
                field: key,
                message: errors[key][0]
            })
        }

        this.request.session.errors = errors;
        // return this.res.redirect(this.previousUrl);
        return this.res.redirect('back');
    }
}

module.exports = (req, res, next) => {
    req.session.success = {};

    let request = new UpdateRequest(req, res, next);
    //
    // if(request.failed())
    // {
    //     // make redirect back
    //     return request.badRequest();
    // }
    //
    // return next();
};