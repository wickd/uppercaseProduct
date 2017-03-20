let h = require('./helpers');

class Session {

    /**
     * Session constructor.
     *
     * @param session
     */
    constructor(session)
    {
        this.session = session;
    }

    /**
     * Check if session has errors.
     *
     * @return {boolean}
     */
    hasErrors()
    {
        return h.isset(this.errors()) && ! h.empty(this.errors());
    }

    /**
     * Check if session has success message.
     *
     * @return {boolean}
     */
    hasSuccess()
    {
        return h.isset(this.session.success) && ! h.empty(this.session.success);
    }

    /**
     * Check if session have warnings
     *
     * @return {boolean}
     */
    hasWarnings()
    {
        return h.isset(this.session.warning) && ! h.empty(this.session.warning);
    }

    /**
     * Get success message.
     *
     * @return {Session.success.message|null}
     */
    getSuccessMessage()
    {
        if(h.isset(this.session.success.message))
        {
            return this.session.success.message;
        }

        return null;
    }

    /**
     * Get warning message.
     *
     * @return {*}
     */
    getWarningMessage()
    {
        if(h.isset(this.session.warning.message))
        {
            return this.session.warning.message;
        }

        return null;
    }

    /**
     * Get errors.
     *
     * @return {*}
     */
    errors()
    {
        return this.session.errors;
    }

    /**
     * Get error by key.
     *
     * @param key
     * @return {*}
     */
    error(key)
    {
        return this.errors()[key];
    }

    /**
     * With success.
     *
     * @param s
     * @return {Session}
     */
    withSuccess(s)
    {
        this.session.success = {
            message: s
        };

        return this;
    }
}

module.exports = Session;