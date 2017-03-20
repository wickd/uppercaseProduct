let Presenter = require('./presenter');

class ClientFeedbackPresenter extends Presenter {

    /**
     * ClientFeedbackPresenter constructor.
     *
     * @param model
     * @return ClientFeedbackPresenter
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * Render client's name.
     *
     * @return string
     */
    renderName()
    {
        return this.model.name ? this.helper().uc_first(this.model.name) : '';
    }

    /**
     * Render client's message.
     *
     * @param {Number} length
     * @return string
     */
    renderShortMessage(length = 170)
    {
        let message = this.model.message ? this.model.message : '';

        if(message)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper().strip_html(message).substr(0, length));
        }

        return '';
    }
}

module.exports = ClientFeedbackPresenter;