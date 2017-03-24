let Repository = require('./dashboard/administrator/repository');
let HasPresenter = require('presenter').mixin;
let AttachmentPresenter = require(_namespace.app_path() + '/presenters/attachmentPresenter');
const DIRECTORY_SEPARATOR = '/';
const GALLERY = 'gallery';

let attachmentType = null;

class Attachment extends HasPresenter(Repository)
{
    /**
     * static properties
     * @returns {*}
     */
    static get attachmentType(){
        return attachmentType;
    }

    static set attachmentType(type){
        attachmentType = type;
    }

    static get GALLERY()
    {
        return GALLERY;
    }

    constructor()
    {
        super();

        this.table = 'attachments';
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'attachment_id', 'attachment_type', 'filepath', 'filename', 'original_name', 'mime', 'active', 'type' ];
        this.presenter = AttachmentPresenter;
    }


    /**
     * Get file
     *
     * @param attach_id
     * @param attach_type
     * @param type
     * @returns {*}
     */
    getFile(attach_id, attach_type, type = null)
    {
        this.select()
            .where('attachment_id', '=', attach_id)
            .where('attachment_type', '=', `${attach_type}`);

        if(type)
        {
            this.where('type', '=', type);
        }


        return this.first();
    }

    getFiles(attach_id, attach_type, type = null)
    {
        this.select()
            .where('attachment_id', '=', attach_id)
            .where('attachment_type', '=', `${attach_type}`);

        if(type)
        {
            this.where('type', '=', type);
        }

        return this.get();
    }

    /**
     * Generate full path to the attachement file.
     *
     * @returns {string}
     */
    getFullPath()
    {
        return DIRECTORY_SEPARATOR + this.filepath + DIRECTORY_SEPARATOR + this.filename;
    }

}

module.exports = Attachment;