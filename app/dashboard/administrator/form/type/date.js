let Element = require('../element');
let f = require('../../helpers/functions');

class Date extends Element {

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
        return f.view('form/type/templates/date/datepicker.pug', { element: this });
    }
}

module.exports = Date;