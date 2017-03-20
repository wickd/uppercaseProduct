let Presenter = require('./presenter');

class CategoryPresenter extends Presenter {

    /**
     * CategoryPresenter constructor.
     *
     * @param model
     * @return CategoryPresenter
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
        return this.model.name ? this.helper().uc_first(this.model.name) : '';
    }
}

module.exports = CategoryPresenter;