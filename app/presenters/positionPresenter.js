let Presenter = require(_namespace.app_path() + '/presenters/presenter');

class PositionPresenter extends Presenter
{
    /**
     * PositionPresenter constructor
     * 
     * @return PositionPresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Render position name.
     *
     * @return {String}
     */
    renderName()
    {
        return this.model.name ? this.model.name.toUpperCase() : '';
    }
}

module.exports = PositionPresenter;