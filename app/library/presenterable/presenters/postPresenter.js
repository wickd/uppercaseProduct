let Presenter = require('./presenter');
let HasImages = require('../hasImages');

class PostPresenter extends HasImages(Presenter) {

    /**
     * PostPresenter constructor.
     *
     * @param model
     * @return PostPresenter
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
     * @param {Number} [length] [Length of the short description]
     * @return {string}
     */
    renderShortDescription(length = 175)
    {
        let body = this.model.body ? this.model.body : '';

        if(body)
        {
            return this.helper()
                .sprintf('%s...', this.f_helper().strip_html(body).substr(0, length));
        }

        return '';
    }

    /**
     * Render public date in special format.
     *
     * @param {String} format
     * @return {String} date
     */
    renderPublicDate(format = 'D MMM YYYY, H:mm')
    {
        return this.date('created_at', format);
    }
}

module.exports = PostPresenter;