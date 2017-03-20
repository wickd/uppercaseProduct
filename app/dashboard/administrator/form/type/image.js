let File = require('../type/file');
let h = require('../../helpers');
let f = require('../../helpers/functions');

class Image extends File {

    constructor(name)
    {
        super(name);

        this.attributes = {
            style: "width: 300px",
            class: "form-control"
        }
    }
    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
         return f.view('form/type/templates/image.pug', { element: this });
    }
}

module.exports = Image;