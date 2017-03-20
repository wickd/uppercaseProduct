let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class ServicePresenter extends HasImages(Presenter)
{
    /**
     * ServicePresenter constructor.
     *
     * @param model
     * @return ServicePresenter
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
    renderDescription()
    {
        let body = this.model.getAttribute('description') ? this.model.description : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s',
                    this
                        .f_helper()
                        .strip_html(body)
                );
        }
        return '';
    }
    renderShortDescription(length = 175)
    {
        let body = this.model.getAttribute('description') ? this.model.description : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper()
                    .strip_html(body).substr(0, length));
        }
        return '';
    }
}

module.exports = ServicePresenter;