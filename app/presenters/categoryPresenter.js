let Presenter = require(_namespace.app_path() + '/presenters/presenter');

class CategoryPresenter extends Presenter
{
    /**
     * CategoryPresenter constructor
     * 
     * @return CategoryPresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Render Category name.
     *
     * @return {String}
     */
    renderName()
    {
        return this.helper().uc_first(this.model.name);
    }
}

module.exports = CategoryPresenter;