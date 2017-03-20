let h = require('../helpers');
let ElementMixins = require('./elementMixins');
let BoilerplateMixin = require('./boilerplate');
let ValidableMixin = require('./validable');
let HasRepositoryMixin = require('./hasRepository');

class Element extends BoilerplateMixin(ValidableMixin(HasRepositoryMixin(ElementMixins))) {

    /**
     * Element constructor
     *
     * @return void.
     */
    constructor(name, options = {})
    {
        super();

        if (super.boot) super.boot();

        this.translatable = false;

        this.name = name;

        this.options = options;

        this.setLabel(name);
    }

    /**
     * Init from object.
     *
     * @param options
     * @param item
     * @return {Element}
     */
    initFromObject(options = null, item = null)
    {
        let app = global.dashboard;

        if(h.is_null(this.model))
        {
            this.model = item ? item : app.get('schedule_model');
        }

        this.attributes = h.merge(this.attributes, h.object_except(options, 'type'));

        this.validateAttributes();

        this.decoupleOptionsFromAttributes();

        this.setDefaultValue();

        return this;
    }

    /**
     * Check if element is hidden input.
     *
     * @return {boolean}
     */
    isHidden()
    {
        return this instanceof require('./hiddenElement');
    }

    /**
     * Check if element is an instance of ./Uploadable.
     *
     * @return {boolean}
     */
    isUploadable()
    {
        return this instanceof require('./uploadable');
    }

    /**
     * Html.
     *
     * @return {*}
     */
    html()
    {
        this.setDefaultValue();

        return this.renderInput() + this.renderErrors();
    }

    /**
     * Set deault value.
     *
     * @return {Element}
     */
    setDefaultValue()
    {
        if((! this.hasValue() || h.is_callable(this.getValue())) && this.hasModel())
        {
            if(h.is_callable(this.getValue()))
            {
                let clojure = this.getValue();

                if(clojure)
                {
                    this.setValue(
                        h.call_user_func(clojure, this.getRepository())
                    );
                }
            } else {
                this.extractValueFromModel();
            }
        }

        return this;
    }
}

module.exports = Element;