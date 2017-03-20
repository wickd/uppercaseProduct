let Presenter = require('./presenter');

class AdminPresenter extends Presenter {

    /**
     * AdminPresenter constructor.
     *
     * @param model
     * @return AdminPresenter
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
        return this.helper().uc_first(this.model.name);
    }
}

module.exports = AdminPresenter;