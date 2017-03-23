let Repository = require('./repository');
let Attachment = require(_namespace.app_path() + '/Attachment');
let h = require('../dashboard/administrator/helpers');

class AttachmentRepository extends Repository {

    /**
     * AttachmentRepository constructor
     *
     * @return {AttachmentRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Attachment}
     */
    getModel()
    {
        return new Attachment();
    }

    /**
     * Create attachment.
     *
     * @param {Object} item
     * @param {Object} file
     * @param {String} type
     * @param {String} destination
     * @return {Attachment}
     */
    create(item, file, type, destination)
    {
        return this.getModel()
            .create({
                'attachment_id' : item.id,
                'attachment_type' : item.getTable(),
                'filepath' : destination,
                'filename' : file.filename,
                'original_name' : file.originalname || '',
                'mime' : file.mimetype || '',
                'type' : type
            });
    }
}

module.exports = AttachmentRepository;