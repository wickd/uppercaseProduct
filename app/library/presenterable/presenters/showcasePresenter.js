let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class ShowcasePresenter extends HasImages(Presenter) {

    /**
     * ShowcasePresenter constructor.
     *
     * @param model
     * @return ShowcasePresenter
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
     * Render full short description.
     *
     * @param $field {string|'description'} optional
     * @return {string}
     */
    renderDescription($field = 'description')
    {
        let body = this.model[$field] ? this.model[$field] : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper().strip_html(body).substr(0, 175))
        }

        return '';
    }

    /**
     * Render short description.
     *
     * @return {string}
     */
    renderShortDescription($field = 'short_description')
    {
        return this.renderDescription($field);
    }

    /**
     * Generate link.
     *
     * @return {string}
     */
    generateLink()
    {
        return this.f_helper().output_url(this.model, 'link', this.model.link);
    }
}

module.exports = ShowcasePresenter;