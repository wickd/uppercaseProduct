let h = require('../helpers');

module.exports = superclass => class extends superclass{

    boot()
    {
        this.model = null;
        if (super.boot) super.boot();
    }

    /**
     * @static Set repository.
     *
     * @param model
     */
    static setRepository(model)
    {
        this.model = model;

        return this;
    }

    /**
     * Set repository.
     *
     * @param model
     * @return {*}
     */
    setRepository(model)
    {
        this.model = model;

        return this;
    }

    /**
     * Get repository.
     *
     * @
     */
    getRepository()
    {
        if(h.is_null(this.model) || h.isUndef(this.model))
        {
            // throw new Error('No repository found. Please use Element.setRepository method for this.');
            console.log('No repository found. Please use Element.setRepository method for this.');
        }

        return this.model;
    }

    /**
     * Check if has model.
     *
     * @return {boolean}
     */
    hasModel()
    {
        return ! h.is_undef(this.model);
    }

    /**
     * Extract value from model
     *
     * return {*}
     */
    extractValueFromModel()
    {
        // todo: ORM IMPLEMENT FUTURE.
        // this.setValue(
        //     this.getRepository().getAttribute(this.getName())
        // );

        let model = this.getRepository();

        if(h.is_null(model))
        {
            return this.setValue('');
        }

        this.setValue(
            this.getRepository()[this.getName()]
        );
    }
};