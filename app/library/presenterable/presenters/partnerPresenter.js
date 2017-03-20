let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class PartnerPresenter extends HasImages(Presenter) {

    /**
     * PartnerPresenter constructor.
     *
     * @param model
     * @return PartnerPresenter
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

module.exports = PartnerPresenter;