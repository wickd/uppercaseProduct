let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class NewsPresenter extends HasImages(Presenter) {

    /**
     * NewsPresenter constructor.
     *
     * @param model
     * @return NewsPresenter
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
            .uc_first(this.model.title);
    }

    /**
     * Render short description.
     *
     * @return {string}
     */
    renderShortDescription(length = 175)
    {
        let body = this.model.body ? this.model.body : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper()
                    .strip_html(body).substr(0, length));
        }

        return '';
    }

    /**
     * Render newses public date in special format.
     *
     * @param {String} format
     * @return {String} date
     */
    renderNewsPublicDate(format = 'D MMM YYYY, H:mm')
    {
        return this.date('created_at', format);
    }
}

module.exports = NewsPresenter;