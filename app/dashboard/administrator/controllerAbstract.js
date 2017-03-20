let q = require('q');
let h = require('./helpers');
let config = require('./config');

class ControllerAbstract {

    /**
     * ControllerAbstract Constructor.
     *
     * @param action
     * @param shedule
     * @param user
     */
    constructor(action, shedule = null, user = null)
    {
        if(! h.isset(shedule))
        {
            this.shedule = shedule;

            return ;
        }

        this.initRepository();

        this.user = user;
        this.perPage = null;
        this.model = null;
        this.settings = null;
        this.controller = null;
        this.action = null;
        this.filer = null;
        this.editableFields = null;
        this.repository = null;
        this.schema = null;
    }

    /**
     * Init Repository.
     *
     * @return void.
     */
    initRepository()
    {
        this.model = this.shedule
    }

    /**
     * Get repository.
     *
     * @returns {Repository|null}
     */
    getRepository()
    {
        if(h.is_null(this.repository))
        {
            let Repository = require('./repository');

            this.repository = new Repository();
        }

        return this.repository;
    }

    /**
     * Init pagination.
     *
     * @returns {ControllerAbstract}
     */
    initPagination()
    {
        this.perPage = Number(config.get('dashboard.rows_per_page', 15));

        return this;
    }

    /**
     * Register admin modules. Authorize is last middleware
     * between user and admin panel. Here you can perform if logged in
     * user can perform the action.
     *
     * @param {string} page
     * @param {string} action
     * @param {Function} callback
     * @param {Function|Boolean} authorize
     * @param {{}|null} http
     */
    register(page, action, callback, authorize = true, http = null)
    {
        this.action = action;

        if(h.isCallable(authorize) ? authorize() : authorize)
        {
            this.navigation
                .setCurrentPage(page)
                .loadPageSchedule(page)
                .then(schedule => {
                    this
                        .setSchedule(schedule)
                        .setModel(schedule.getModel());

                    // console.log(schedule);
                    // console.log(schedule.get('query'));

                    return callback(schedule);
                })
                .catch(e => {
                    console.log(e.stack);

                    res.renderModule('errors/index', {error: e, status: 500});
                });
        }
    }

    /**
     * Set schedule.
     *
     * @param schedule
     * @returns {ControllerAbstract}
     */
    setSchedule(schedule)
    {
        this.shedule = schedule;

        return this;
    }

    /**
     * Set model
     *
     * @param model
     * @returns {ControllerAbstract}
     */
    setModel(model)
    {
        this.model = new model();

        return this;
    }

    /**
     * Get schedule.
     *
     * @return {*}
     */
    getSchedule()
    {
        return this.shedule;
    }
}

module.exports = ControllerAbstract;