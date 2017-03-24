/**
 * upload helper
 * @param action
 * @returns {function(*, *, *)}
 *
 */
let fs = require('fs');
let path = require('path');
let sizeOf = require('image-size');
var gm = require('gm');
let b = require('bluebird');
let h = require('../helpers');
let f = require('../helpers/functions');
let Attachment = require(_namespace.app_path() + '/Attachment');

/**
 * default settings
 * @type {{srcPath: string, dstPath: string, width: number, height: number}}
 */
const SETTINGS = {
    srcPath: './public',
    dstPath: './temp',
    width: 1920,
    height: 1080
};

/**
 *
 */
class Upload {

    /**
     * Upload constructor.
     *
     * @param item
     * @param file
     * @return Upload
     */
    constructor(item, file) {

        let attachment = file.getAttachment() || {};
        let options = file.options || {};
        this.settings = {};
        this._file = file;
        this._item = item;

        Object.assign(
            this.settings,
            SETTINGS,
            options,
            {
                fullSrcFile: `${attachment.path}`,
                fullDstFile: `${SETTINGS.srcPath}/${options.dstPath}/${attachment.filename}`,
                filepath: options.dstPath,
                filename: attachment.filename,
                original_name: attachment.originalname,
                mime: attachment.mimetype
            });

        if (item instanceof Attachment) {

            Object.assign(
                this.settings,
                {
                    id: item.id,
                    attachment_id: item.attachment_id,
                    attachment_type: item.attachment_type,
                    type: item.type
                });
        }
        else {

            Object.assign(
                this.settings,
                {
                    attachment_id: item.id,
                    attachment_type: item.getTable(),
                    type: attachment.fieldname
                });
        }
    }


    /**
     * process one file
     * @param file
     * @param settings
     * @returns {*|Promise.<T>}
     * Todo Upload gile in different sizes, preserving original file
     */
    process(file) {
        let deferred = b.defer();

        //process

        //create folder if not exists
        f.ensureExists(this._get('fullDstFile'), () => {

            if (this._is_image()) {
                this._resize().then(result => deferred.resolve(result));
            }
            else {
                this._move().then(result => deferred.resolve(result));
            }

        });

        return deferred.promise;
    }

    /**
     * process all files
     * @param item
     * @param files
     * @returns {Array}
     */
    static all(item, files) 
    {
        let funcs = [];
        let result = {};

        //if items and files are not empty
        if (!h.is_undef(item) && !h.is_empty(files))
        {
            //walk to each file
            h.each(files, (file, key) => {
                let attachment = file.getAttachment();

                //if the item has atachement
                if (!h.empty(attachment) && h.isset(attachment.originalname)) 
                {
                    let upload = new Upload(item, file);
                    //parallel upload file
                    funcs
                        .push(
                            upload.process(attachment)
                            .then((result) => {
                                return result ? upload._saveToDb() : ""
                            })
                        );
                }
            });

            result = b.all(funcs).catch(err => {
                console.log('Upload error : ', err)
            })

        }

        return [result, item];
    }

//------------------private functions---------------------------------

    /**
     * get all settings
     * @returns {*}
     * @private
     */
    _getSettings() {
        return this.settings;
    }


    /**
     * get settings
     * @param st
     * @returns {*}
     * @private
     */
    _get(st = null) {

        return (st && this.settings[st]) ? this.settings[st] : null;
    }


    /**
     * aspect ratio
     * @param dim
     * @returns {*[]}
     * @private
     */
    _dims(dim) {

        let width, height = null;

        if (dim.width >= dim.height) {
            if (dim.width > this._get('width')) {
                width = this._get('width');
            }
            else {
                width = dim.width;
                height = dim.height
            }

        } else if (dim.height > this._get('height')) {
            height = this._get('height')
        }
        else {
            width = dim.width;
            height = dim.height
        }


        return [width, height];
    }

    /**
     * save/update attachment to db
     * @param file
     */
    _saveToDb()
    {
        if(this._file.isMultiple())
        {
            return (new Attachment())
                .create(this._getSettings())
                .then((dbData) => dbData ? this.dstFile : null);
        }

        return new Attachment()
            .updateOrCreate(this._getSettings(), ['id', 'attachment_id', 'attachment_type', 'type'])
            .then((dbData) => dbData ? this.dstFile : null)
    }

    /**
     * is image file
     * @returns {boolean}
     * @private
     */
    _is_image() {

        let test = this.settings.mime.split("/")[0];
        return test == 'image';
    }

    /**
     * resize
     * @private
     */
    _resize() {
        
        let deferred = b.defer();
        let dim = sizeOf(this._get('fullSrcFile'));
        //gets width and height
        let [width, height] = this._dims(dim);


        gm(this._get('fullSrcFile'))
            .resize(width, height)
            .write(this._get('fullDstFile'), (err) => {
                if (err) {
                    console.log('err', err);
                    deferred.resolve(false)
                }

                //remove from temp
                fs.unlink(this._get('fullSrcFile'), (err => {
                    if (err) {
                        console.log('error unlinking file', this._get('fullSrcFile'));
                        console.log('error:', err);
                    }
                }));

                console.log('File resized : ', this._get('fullDstFile'))

                deferred.resolve(true)
            })

        return deferred.promise;
    }

    /**
     * move
     * @private
     */
    _move() {

        let deferred = b.defer();

        fs.rename(this._get('fullSrcFile'), this._get('fullDstFile'), (err) => {
            if (err) {
                console.log('err', err);
                deferred.resolve(false)
            }
            else {
                console.log('File moved : ', this._get('fullDstFile'))
                deferred.resolve(true)
            }
        })

        return deferred.promise;
    }
}

module.exports = Upload;