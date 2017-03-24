let Presenter = require(_namespace.app_path() + '/presenters/presenter');

class AttachmentPresenter extends Presenter
{
    /**
     * AttachmentPresenter constructor
     * 
     * @return AttachmentPresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Get attachment original name.
     *
     * @return {String}
     */
    original()
    {
        return this.model.original_name;
    }

    /**
     * Render path to uploaded file.
     *
     * @return {string}
     */
    renderPath()
    {
        return `/${this.model.filepath}/${this.model.filename}`;
    }
}

module.exports = AttachmentPresenter;