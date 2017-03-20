/**
 * HasActive mixin
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    boot()
    {
        if (super.boot) super.boot();
    }

    /**
     * Get public elements.
     *
     * @return {*}
     */
    getPublic()
    {
        return this.select().where('active', '=', 1).get();
    }

    /**
     * Scope where active.
     *
     * @param active
     */
    whereActive(active = 1)
    {
        return this.where('active', '=', active);
    }
};