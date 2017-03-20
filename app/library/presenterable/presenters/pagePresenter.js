let Presenter = require('./presenter');

class PagePresenter extends Presenter {

    /**
     * PagePresenter constructor.
     *
     * @param model
     * @return PagePresenter
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
     * Render short description.
     *
     * @return {string}
     */
    renderShortDescription()
    {
        let body = this.model.body ? this.model.body : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper().strip_html(body).substr(0, 175))
        }

        return '';
    }
}

module.exports = PagePresenter;