let h = require('../administrator/helpers');
let Session = require('../administrator/session');

class Application {

    /**
     * Application constructor.
     *
     * @param page
     * @param request
     */
    constructor(page, request) {
        this.page = page;
        this.bindings = {};
        this.session = new Session(request.session);
        this.request = request;
    }

    /**
     * Register a binding with the dashboard application.
     *
     * @param {string|object} abstract
     * @param {function|string|null} concrete
     * @return void.
     */
    bind(abstract, concrete = null) {
        // callback might be a Promise.

        if (h.is_callable(concrete)) {
            this.bindings[abstract] = concrete(this);
        } else {
            this.bindings[abstract] = concrete;
        }
    }

    /**
     * Get app bindings.
     *
     * @param key
     * @return {null}
     */
    get(key) {
        return this.bindings[key] ? this.bindings[key] : null;
    }
}

module.exports = Application;