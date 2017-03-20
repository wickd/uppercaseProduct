let Text = require('./text');
let f = require('../../helpers/functions');

class Price extends Text {

    constructor(name)
    {
        super(name);
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return f.view('form/type/templates/price.pug', { element: this });
    }
}

module.exports = Price;