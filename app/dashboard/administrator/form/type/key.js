let Element = require('../element');

class Key extends Element {

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
        return `<p>${this.getValue()}</p>`;
    }
}

module.exports = Key;