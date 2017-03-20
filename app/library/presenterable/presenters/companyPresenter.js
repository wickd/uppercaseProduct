let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class CompanyPresenter extends HasImages(Presenter) {

    /**
     * CompanyPresenter constructor.
     *
     * @param model
     * @return CompanyPresenter
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
}

module.exports = CompanyPresenter;