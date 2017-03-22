let Attachment = require(_namespace.app_path() + '/Attachment');

/**
 * attachment mixin
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    boot()
    {
        if (super.boot) super.boot();
    }

    /**
     * get all media resources
     * @returns {*}
     */
    attachments(type=null)
    {
        return (new Attachment()).getFiles(this.id, this.table,type);
    }

    /**
     * get media by id
     * @param id
     * @returns {*}
     */
    attachment(id)
    {
        return (new Attachment()).getFile(this.id, this.table, id);
    }

    /**
     * get cover image
     * @returns {*}
     */
    cover(type)
    {
        return this.attachments(type).then(result=>result.first());
    }

    /**
     * All images of model.
     *
     * @return {Collection | null}
     */
    images()
    {
        return (new Attachment()).select()
            .where('attachment_id', '=', this.getAttribute('id'))
            .where('attachment_type', '=', `${this.getTable()}`)
            .get();
    }
};