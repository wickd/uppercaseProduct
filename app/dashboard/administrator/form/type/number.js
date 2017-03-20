let Text = require('./text');

class Number extends Text {

    constructor(name)
    {
        super(name);

        this.attributes = {
            min: null,
            max: null,
            class: 'form-control',
            style:'width: 150px;'
        };

        this.rules = {
            min: 'numeric',
            max:'numeric'
        };
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return `<input type="number" name="${this.getName()}" value="${this.getValue()}" ${this.attributesToHtml()}>`;
    }
}

module.exports = Number;