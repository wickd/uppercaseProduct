let h = require('../helpers');
let Urlable = require('./urlable');

class Action {

    /**
     * Action constructor.
     *
     * @param {string} name
     * @param {string} title
     * @param {string} confirmation
     * @param {function|null} callback
     * @param {Boolean|false} disabled
     * @param {{}|null} row
     */
    constructor(name, title = '', confirmation = 'Are you sure?', callback = null, disabled = false, row = null) {
        this.name = name;

        if (h.empty(title)) {
            title = name;
        }

        this.title = h.uc_first(h.explode("_", title).join(" "));

        this.styles = this.getDefaultStyles(title);

        this.setRow(row);

        this.setDisabled(disabled, row);

        this.confirmation = confirmation;

        this.callback = callback;
    }

    /**
     * Get reserved by scaffold actions.
     *
     * @return {string[]}
     */
    getReservedActions() {
        return ['create', 'edit', 'delete', 'view'];
    }

    getReserveActionsStyles() {
        return {
            'edit': {
                class: 'btn btn-sm btn-warning'
            },
            'delete': {
                class: 'btn btn-sm btn-danger'
            },
            'default': {
                class: 'btn btn-sm btn-primary'
            }
        };
    }

    /**
     * Get title
     *
     * @return {string|*}
     */
    getTitle() {
        return this.title;
    }

    /**
     * Get name..
     *
     * @returns {string|*}
     */
    getName() {
        return this.name;
    }

    getStyles() {
        return this.styles;
    }

    setStyles(styles = {}) {
        this.styles = styles;

        return this;
    }

    /**
     * Get confirmation.
     *
     * @return {string}
     */
    getConfirmation() {
        return (this.confirmation ? 'return window.confirm(\'' + this.confirmation + '\')' : '');
    }

    /**
     * Check if url of action is reserved.
     *
     * @return {boolean}
     */
    isReservedUrl() {
        return h.inObject(this.name, this.getReservedActions());
    }

    /**
     * Check if action is disabled for current module.
     *
     * @returns {boolean|*}
     */
    isDisabled() {
        return this.disabled;
    }

    /**
     * Get url.
     *
     * @param {number} id
     * @param action
     * @param {string|null} page
     */
    getUrl(id, action = null, page = null) {


        if (this.callback instanceof Urlable) {
            // callback is an a class which extends Urlable..

            return this.callback.getUrl();
        }

        if (this.isReservedUrl()) {
            if (page) {
                return `${page}/${id}/${this.name}`;
            }

            return `${id}/${this.name}`
        } else {
            if (page) {
                return `${page}/${id}/custom-action/${action}`;
            }

            return `${id}/custom-action/${action}`
        }
    }

    /**
     * Execute action's callback function.
     *
     * @param {{}|null} scaffoldRow
     * @param {[]} args
     * @return {*}
     */
    executeCallback(scaffoldRow = null, ...args) {
        if (!h.isCallable(this.callback)) {
            return false;
        }

        return this.callback(scaffoldRow, args);
    }

    /**
     * Set action to disabled for curent module with posibility
     * of conditions.
     *
     * @param disabled
     * @param {{}|null}scaffoldRow
     * @returns {Action}
     */
    setDisabled(disabled = false, scaffoldRow = null) {
        this.disabled = (h.is_callable(disabled)) ? disabled(scaffoldRow) : disabled;

        return this;
    }

    /**
     * Set row.
     *
     * @param row
     * @returns {Action}
     */
    setRow(row) {
        this.row = row;

        return this;
    }

    /**
     * Get row.
     *
     * @returns {*}
     */
    getRow() {
        return this.row;
    }

    getDefaultStyles(title) {
        let styles = this.getReserveActionsStyles();

        if (h.object_key_exists(title, styles)) {
            return styles[title];
        } else {
            return styles['default'];
        }
    }
}

module.exports = Action;