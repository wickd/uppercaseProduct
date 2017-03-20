let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class ProjectPresenter extends HasImages(Presenter) {

    /**
     * ProjectPresenter constructor.
     *
     * @param model
     * @return PostPresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Render name.
     *
     * @return string
     */
    renderName()
    {
        return this.helper()
            .uc_first(this.model.name);
    }

    /**
     * Render link.
     *
     * @return {string}
     */
    renderLink()
    {
        let body = this.model.short_description ? this.model.short_description : '';

        if(body)
        {
            return this.helper()
                .sprintf('<a href="%s">%s</a>', this.model.link, this.model.link);
        }

        return '';
    }

    /**
     * Render description.
     *
     * @param {string} field
     * @return {string}
     */
    renderDescription(field = 'description')
    {
        let body = this.model.getAttribute(field) ? this.model.getAttribute(field) : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s', this.f_helper().strip_html(body));
        }

        return '';
    }
    /**
     * Render short description.
     *
     * @param {string} field
     * @param {Number} [length] [Length of the short description]
     * @return {string}
     */
    renderShortDescription(field = 'description', length = 175)
    {
        let body = this.model.getAttribute(field) ? this.model.getAttribute(field) : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper().strip_html(body).substr(0, length));
        }

        return '';
    }

    /**
     * Render public date in special format.
     *
     * @param {String} format
     * @return {String} date
     */
    renderPublicDate(format = 'D MMM YYYY, H:mm')
    {
        return this.date('created_at', format);
    }
}

module.exports = ProjectPresenter;