let Presenter = require(_namespace.app_path() + '/presenters/presenter');

class ServicePresenter extends Presenter
{
    /**
     * ServicePresenter constructor
     * 
     * @return ServicePresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Render description.
     *
     * @param {string} field
     * @param length {Number, '175'} Length of description.
     * @return {string}
     */
    renderDescription(field, length = 175)
    {
        let body = this.model[field] ? this.model[field] : '';

        if(body)
        {
            let _text = this.helper()
                .sprintf('%s...', this.funcs().strip_html(body));

            return length ? _text.substr(0, length) : _text;
        }

        return '';
    }

    /**
     * Render Service name.
     *
     * @return {String}
     */
    renderName()
    {
        return this.helper().uc_first(this.model.name);
    }
}

module.exports = ServicePresenter;