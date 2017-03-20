let h = require('../helpers');

module.exports = superclass => class extends superclass {

    /**
     * Boirplate
     *
     * @private
     */
    boot()
    {
        this.name = null;
        this.label = null;
        this.description = null;
        this.value = null;
        this.attributes = {
            class: "form-control"
        };
        this.options = {};

        /** Call parent attributes for init if exists */
        if (super.boot) super.boot();

        if(! ('renderInput' in this))
        {
            throw new Error('Element must have abstract method renderInput() ');
        }
    }

    /**
     * Get element name
     *
     * @returns {null|*}
     */
    getName()
    {
        return this.name;
    }

    /**
     * Set element name
     *
     * @param {string} name
     * @returns {Element}
     */
    setName(name)
    {
        this.name = name;

        return this;
    }

    /**
     * Set element label.
     *
     * @param {string|null} label
     * @returns {Element}
     */
    setLabel(label = null)
    {
        if(! label)
        {
            label = this.getName();
        }

        this.label = h.uc_first(label.replace(/_|-/gi, " "));

        return this;
    }

    /**
     * Get element label.
     *
     * @returns {null|*}
     */
    getLabel()
    {
        return this.label;
    }

    /**
     * Set element value.
     *
     * @param {string|null} value
     * @return {Element}
     */
    setValue(value = null)
    {
        this.value = value;

        return this;
    }

    /**
     * Get element value.
     *
     * @return {string|null|*|null}
     */
    getValue()
    {
        return ! h.is_null(this.value) ? this.value : '';
    }

    /**
     * Set element description.
     *
     * @param desc
     * @return {Element}
     */
    setDescription(desc = null)
    {
        this.description = desc;

        return this;
    }

    /**
     * Get element description.
     *
     * @return {*|null}
     */
    getDescription()
    {
        return this.description;
    }

    /**
     * Decouple options of element from attributes.
     *
     * @return void
     */
    decoupleOptionsFromAttributes()
    {
        if(! h.is_null(this.attributes))
        {
            h.each(this.attributes, (value, key) => {
                if(h.property_exists(key, this))
                {
                    let method = "set" + h.uc_first(key);

                    if(h.object_key_exists(method, this))
                    {
                        this[method](value);
                    } else {
                        this[key] = value;
                    }

                    if(! h.is_undef(this.attributes[key]))
                    {
                        delete this.attributes[key];
                    }
                }
            })
        }
    }

    /**
     * Check if element has a value.
     *
     * @return {boolean}
     */
    hasValue()
    {
        return (! h.is_null(this.value)) && (! h.is_callable(this.value));
    }

    /**
     * Get class type.
     *
     * @return {string}
     */
    getType()
    {
        return h.get_class(this).toLowerCase();
    }

    /**
     * Set element attributes.
     *
     * @param attributes
     * @return {Element}
     */
    setAttributes(attributes = {})
    {
        this.attributes = attributes;

        return this;
    }

    /**
     * Get attributes
     *
     * @return {*}
     */
    getAttributes()
    {
        return this.attributes;
    }

    attributesToHtml()
    {
        let html_attr = '';
        let i = 0;

        h.object_walk(this.attributes, (value, attribute) => {
            // if(h.last(this.attributes) == attribute)
            // {
            //     html_attr += ` ${attribute}="${value}"`;
            //
            // } else {
            //     html_attr += ` ${attribute}="${value}"`;
            // }

            html_attr += ` ${attribute}="${value}"`;

            i++;
        });

        return html_attr;
    }
};