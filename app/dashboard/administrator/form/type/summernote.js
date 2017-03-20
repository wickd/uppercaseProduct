let Textarea = require('../element');
let h = require('../../helpers');
let f = require('../../helpers/functions');

const EDITOR_NAME = 'summernote';

class Summernote extends Textarea {

    /**
     * Summernote constructor.
     *
     * @param name
     */
    constructor(name)
    {
        super(name);

        this.attributes = h.merge(this.attributes, {
            "date-editor": EDITOR_NAME,
            "style": "max-width:700px"
        });
    }

    /**
     * Render input.
     *
     * @return {*}
     */
    renderInput()
    {
        return `<div style="width: 950px"><textarea name="${this.getName()}" ${f.html_attributes(this.attributes)}>${this.getValue()}</textarea></div>`;
    }
}

module.exports = Summernote;