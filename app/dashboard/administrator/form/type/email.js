let Text = require('./text');


class Email extends Text {

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
        return `<input type="email" name="${this.getName()}" value="${this.getValue()}" ${this.attributesToHtml()}>`;
    }
}

module.exports = Email;