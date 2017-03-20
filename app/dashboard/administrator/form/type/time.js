let Element = require('../element');
let f = require('../../helpers/functions');

class Time extends Element {

    /**
     * Date Type constructor.
     *
     * @param name
     */
    constructor(name)
    {
        super(name);

        this.attributes = {
            class: "form-control",
            style: "width: 262px"
        };

        this.rules = {};
    }

    /**
     * Render input.
     *
     * @return {String}
     */
    renderInput()
    {
        return f.view('form/type/templates/date/time.pug', { element: this });
    }
}

module.exports = Time;