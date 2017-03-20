let Element = require('../element');

class Password extends Element {

    constructor(name)
    {
        super(name);

        this.attributes = {
            maxlength: 100,
            class: 'form-control',
            style: 'width: 300px;'
        };

        //  class="form-control" style="width: 300px;"
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
        return `<input type="password" name="${this.getName()}" value="" ${this.attributesToHtml()}>`;
    }
}

module.exports = Password;