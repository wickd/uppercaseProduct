let Presenter = require('./presenter');

class SocialPresenter extends Presenter {

    /**
     * SocialPresenter constructor.
     *
     * @param model
     * @return SocialPresenter
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
     * Generate link.
     *
     * @return {string}
     */
    generateLink()
    {
        return this.f_helper().output_url(this.model, 'link', this.model.link);
    }
}

module.exports = SocialPresenter;