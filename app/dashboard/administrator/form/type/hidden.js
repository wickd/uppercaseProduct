let HiddenElement = require('../hiddenElement');

class Hidden extends HiddenElement {

    /**
     * Hidden constructor.
     *
     * @param name
     */
    constructor(name)
    {
        super(name);

        this.attributes = {};

        this.rules = {
            maxlength: 'integer|min:0|max:255'
        };
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return `<input type="hidden" name="${this.getName()}" value="${this.getValue()}" ${this.attributesToHtml()}>`;
    }
}

module.exports = Hidden;