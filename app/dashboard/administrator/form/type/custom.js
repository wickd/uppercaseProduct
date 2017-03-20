let Customable = require('../customable');
let f = require('../../helpers/functions');

/**
 * Don't use this type of form_type, because it anti-conceptual of scaffolding system.
 * use it if you don't have another way to resolve your issue.
 *
 */
class Custom extends Customable {

    /**
     * Select constructor.
     *
     * @param name
     */
    constructor(name)
    {
        super(name);
        this.options = {};
        this.attributes = {
            // class: "form-control",
        };
    }

    /**
     * Render input.
     *
     * @return {String}
     */
    renderInput()
    {
        return this.renderBody(this);
    }
}

module.exports = Custom;