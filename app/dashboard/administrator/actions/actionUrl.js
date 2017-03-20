let Urlable = require('./urlable');
let h = require('../helpers');

/**
 *
 */
class ActionUrl extends Urlable {
    /**
     *
     * @param url
     * @param callback
     * @param model
     */
    constructor(url, callback = null, model = null)
    {
        super(url);

        this.callback = callback;
        this.model = model;
        this.parsed = false;
    }

    /**
     *
     * @returns {string|*}
     */
    getUrl()
    {
        if(! this.parsed)
        {
            let params = this.extractArguments();

            this.replacePlaceholders(params);

            this.parsed = true;
        }

        return this.combineQstrings();
    }

    /**
     * Extract arguments.
     * todo: fix it.
     *
     * @return {{}}
     */
    extractArguments()
    {
        let params = {};

        if(! h.is_null(this.callback))
        {
            if(! h.is_callable(this.callback) && ! h.is_object(this.callback))
            {
                // throw new Error("Callback must be a callback or object");
                console.log("Callback must be a callback or object");
                return;
            }

            params = h.is_callable(this.callback)
                ? this.callback(this.model)
                : this.callback;
        }

        return params;
    }

    /**
     *
     * @param params
     */

    replacePlaceholders(params)
    {
        let matched = {};

        // Search for {}..
        // this.url.replace(/\{([a-z0-9\_]+)\}/i, (matches, field) => {
        this.url = this.url.replace(/\(\:([a-z0-9\_]+)\)/gi, (matches, field) => {
            let value = this.model ? this.model[field] : params[field];

            return matched[field] = value;
        });

        let diff = h.object_diff_assoc(params, matched);

        if(h.empty(diff))
        {
            let temp = {};
            let parts = this.parseUrl(this.url);

            if(h.object_key_exists('query', parts))
            {
                temp = querystring.parse(parts.query);
                this.url = parts.path;

            } else if(! h.empty(h.merge(temp, diff))) {
                this.url += '?' + querystring.stringify(h.merge(temp, diff));
            }
        }
    }
}

module.exports = ActionUrl;