let Presenter = require('./presenter');
let HasImages = require('../hasImages');
const CURRENT = 'current';
const ONGOING = 'ongoing';
const PAST = 'past';

class EventPresenter extends HasImages(Presenter) {

    /**
     * EventPresenter constructor.
     *
     * @param model
     * @return EventPresenter
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
        return this.helper().uc_first(this.model.name);
    }

    /**
     * Render short description.
     *
     * @param length {Number, '175'} Length of description.
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
     * Get event start day.
     *
     * @param column
     * @return {string}
     */
    getStartEventDay(column = 'start_at')
    {
        let start_at = this.date(column);

        return start_at && start_at.isValid() ? start_at.format('DD') : '00';
    }

    /**
     * Get event start month.
     *
     * @param column
     * @return {String}
     */
    getStartEventMonth(column = 'start_at')
    {
        let start_at = this.date(column);

        return start_at && start_at.isValid() ? start_at.format('MMMM') : '';
    }

    /**
     * Get event stop day.
     *
     * @param column
     * @return {string}
     */
    getStopEventDay(column = 'stop_at')
    {
        let stop_at = this.date(column);

        return stop_at && stop_at.isValid() ? stop_at.format('DD') : '00';
    }

    /**
     * Get event stop month.
     *
     * @param column
     * @return {String}
     */
    getStopEventMonth(column = 'stop_at')
    {
        let stop_at = this.date(column);

        return stop_at && stop_at.isValid() ? stop_at.format('MMMM') : 'December';
    }

    /**
     * Generate status of event.
     *
     * @return string
     */
    status()
    {
        if(! this.hasPeriod())
        {
            return ONGOING;
        }

        let now = this.renderNowDate();

        if(now.isBetween(this.date('start_at'), this.date('stop_at'))
            || now.isSame(this.date('stop_at'))
            || now.isBefore(this.date('stop_at').add(1, 'day'))
        ) {
            return CURRENT;
        }

        return PAST;
    }

    /**
     * Check if event has a period.
     *
     * @return {boolean}
     */
    hasPeriod()
    {
        return (this.date('start_at').isValid() && this.date('stop_at').isValid())
            || this.date('start_at').isValid()
            || this.date('stop_at').isValid();
    }
}

module.exports = EventPresenter;