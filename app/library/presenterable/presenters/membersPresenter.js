let Presenter = require('./presenter');

class MembersPresenter extends Presenter {

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
    renderLastName()
    {
        return this.helper()
            .uc_first(this.model.last_name);
    }
    renderEmail()
    {
        let email = this.model.email;
        return this.helper()
            .sprintf('<a href="%s" target="_blank" >%s</a>',email,email)
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
                .sprintf('%s...', this.f_helper().escape(body).substr(0, 175))
        }

        return '';
    }
}

module.exports = MembersPresenter;