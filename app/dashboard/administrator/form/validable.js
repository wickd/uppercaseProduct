let h = require('../helpers');

module.exports = superclass => class extends superclass {

    /**
     * Validate attributes.
     *
     * @private
     */
    boot()
    {
        this.errors = [];
        this.rules = {};
        if (super.boot) super.boot();
    }

    /**
     * Set rules for element.
     *
     * @param rules
     */
    setRules(rules = {})
    {
        this.rules = rules;

        return this;
    }

    /**
     * Check is filed has errors.
     *
     * @return {boolean}
     */
    hasErrors()
    {
        return ! h.empty(this.errors);
    }

    /**
     * Validate attributes.
     *
     */
    validateAttributes()
    {
        // todo: make validations..
    }

    renderErrors()
    {
        if (! this.hasErrors()) {
            return "";
        }

        return `<ul class="errors"><li>${this.errors.join("</li><li>")}</li></ul>`;
    }
};