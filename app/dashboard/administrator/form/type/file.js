let Uploadable = require('../uploadable');
let h = require('../../helpers');
let f = require('../../helpers/functions');

class File extends Uploadable {

    constants()
    {
        const NAMING_ORIGIN = 'original';
        const NAMING_RANDOM = 'random';
        const NAMING_CHECKSUM = 'checksum';

        return {
            NAMING_ORIGIN: NAMING_ORIGIN,
            NAMING_RANDOM: NAMING_RANDOM,
            NAMING_CHECKSUM: NAMING_CHECKSUM
        }
    }

    constructor(name)
    {
        super(name);

        this.naming = this.constants().NAMING_CHECKSUM;

        this.rules = {
            location: 'required'
        };

        /** The specific defaults for subclasses to override */
        this.arguments = {};
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return f.view('form/type/templates/file.pug', { element: this });
    }

    /**
     * Upload file.
     *
     * @param file
     */
    upload(file)
    {
        // todo: here comes the file.
        console.log(file);
    }
}

module.exports = File;