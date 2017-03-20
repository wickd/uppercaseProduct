let h = require('../../../dashboard/administrator/helpers');
let f = require('../../../dashboard/administrator/helpers/functions');
let m = require('moment');

class Presenter {

    /**
     * Presenter constructor.
     *
     * @param model
     * @return Presenter
     */
    constructor(model)
    {
        this.model = model;
        this.h = h;
        this.f = f;
        this.m = m;
    }

    /**
     * Get helper instance.
     *
     * @return {*}
     */
    helper()
    {
        return this.h;
    }

    /**
     * Get functions helper instance.
     *
     * @return {*}
     */
    f_helper()
    {
        return this.f;
    }

    /**
     * Get moment library.
     *
     * @docs https://momentjs.com/
     * @return {Presenter.moment}
     */
    moment()
    {
        return this.m;
    }

    /**
     * Render date.
     *
     * @param {String|'created_at'} column
     * @param {String|'d.m.Y'|null} format, check https://momentjs.com/docs/#/displaying/
     * @return {string}
     */
    date(column = 'created_at', format = null)
    {
        let momentDate = this.moment()(this.model[column]);

        return format ? momentDate.format(format) : momentDate;
    }

    /**
     * Render now date time timestamp
     *
     * @return {Moment}
     */
    renderNowDate()
    {
        return this.moment()();
    }
}

module.exports = Presenter;