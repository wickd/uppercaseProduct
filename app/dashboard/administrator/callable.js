let h = require('./helpers');

module.exports = superclass => class extends superclass {

    boot()
    {
        if (h.isCallable(this.outputCallback) || h.isPromise(this.outputCallback))
        {
            this.outputCallbackPromiseResult = {};
        }

        /** Call parent attributes for init if exists */
        if (super.boot) super.boot();
    }

    /**
     * Set output promise result.
     *
     * @param result
     * @return this
     */
    setOutputPromiseResult(result)
    {
        this.outputCallbackPromiseResult = result;

        return this;
    }

    /**
     * Get row output promise result.
     *
     * @param row
     * @return {{}|*}
     */
    getRowOutputPromiseResult(row)
    {
        // todo: will no work fir tables which does not have the `id` field (Hardcoded).

        return h.isset(this.outputCallbackPromiseResult[row.id])
            ? this.outputCallbackPromiseResult[row.id]
            : '';
    }

    /**
     * Get output promise result.
     *
     * @param row
     * @return {{}|*}
     */
    getOutputPromiseResult()
    {
        return this.outputCallbackPromiseResult;
    }

    /**
     * Check if for this column, output callback
     * is a promise and have an a result.
     *
     * @return {boolean}
     */
    hasOutputPromiseResult()
    {
        return h.isset(this.outputCallbackPromiseResult);
    }
};