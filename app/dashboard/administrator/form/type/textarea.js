let Element = require('../element');
let f = require('../../helpers/functions');

class Textarea extends Element {

    constructor(name)
    {
        super(name);

        this.attributes = {
            class: "form-control",
            style: "max-width: 700px; height: 150px; width:700px"
        };

        this.rules = {};
    }

    renderInput()
    {
        return `<textarea name="${this.getName()}" ${f.html_attributes(this.attributes)}>${this.getValue()}</textarea>`;
    }
}

module.exports = Textarea;