let Presenter = require('./presenters/presenter');
const PRESENTER = 'presenter';

/**
 * HasPresenter mixin
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    /**
     * Boot another possible mixins.
     *
     * @return void
     */
    boot()
    {
        if (super.boot) super.boot();
    }

    /**
     * Serialize presenter.
     *
     * @return {Presenter|null}
     */
    present()
    {
        let presenter = this[PRESENTER];

        if(! presenter)
        {
            console.log(`Unable to init Presenter for ${this.model.constructor.name} model.`);

            return null;
        }

        return new presenter(this);
    }
};