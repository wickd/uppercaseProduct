let Element = require('./element');
let Collection = require('../../eloquentable/collection');
let h = require('../helpers');
let fs = require('fs');
const DEFAULT_IMAGE = '/dashboard/assets/img/landing/shattered.png';

/**
 *
 */
class Uploadable extends Element {
    /**
     *
     * @param name
     */
    constructor(name) {
        super(name);
        this.attachment = {};
        this.files = {};
        this.default=DEFAULT_IMAGE;
    }

    /**
     *
     * @param file
     * @returns {Uploadable}
     */
    setAttachment(file) {
        this.attachment = file;
        return this;
    }

    /**
     *
     * @param attachments
     * @returns {Uploadable}
     */
    attach(attachments = {}) {
        this.files = attachments;
        return this;
    }

    /**
     *
     * @returns {{}|*}
     */
    attached(name = null) {
        let files = this.getFiles(name);

        if(files instanceof Collection)
        {
            return files;
        }

        return [files];
    }

    /**
     *
     * @returns {boolean}
     */
    hasAttached(name = null)
    {
        let files = this.getFiles(name);

        if(files instanceof Collection)
        {
            return files.count();
        }

        return ! h.empty(files);
    }


    /**
     *
     * @returns {*}
     */
    getAttachment() {
        return this.attachment;
    }

    /**
     * Get files
     *
     * @param name
     * @return {*}
     */
    getFiles(name = null)
    {
        if(name && this.files instanceof Collection)
        {
            return this.files.whereRow('type', name);
        }

        return this.files;
    }

    /**
     *todo find a better way to get full file path
     * @param attachment
     * @returns {string}
     */
    static getFilePath(attachment) {

        let path = `${attachment.getAttribute('filepath')}/${attachment.getAttribute('filename')}`;

        if (fs.existsSync(path)) {
            return path;
        }
        else {
            return DEFAULT_IMAGE;
        }
    }

}

module.exports = Uploadable;