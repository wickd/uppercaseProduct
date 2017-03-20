let Element = require('../element');

class Text extends Element {

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
        return `<input type="text" name="${this.getName()}" value="${this.getValue()}" ${this.attributesToHtml()}>`;
    }
}

module.exports = Text;