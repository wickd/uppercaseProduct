let Element = require('../element');
let f = require('../../helpers/functions');
let h = require('../../helpers');
const MULTIPLE = 'multiple';
const DEFAULT = 'default';
const KEY = 'key';
const VALUE = 'value';
let co = require('co');

class Select extends Element {

    /**
     * Select constructor.
     *
     * @param name
     */
    constructor(name)
    {
        super(name);
        this.options = {};
        this.attributes = {
            class: "form-control",
            style: "width: 300px"
        };
    }

    /**
     * Set options.
     *
     * @param options
     * @return {Select}
     */
    setOptions(options)
    {
        this.options = options;
        this.resolveOptions();

        return this;
    }

    /**
     * Check if options is closure.
     *
     * @return {boolean}
     */
    valuesAsClosure()
    {
        return h.is_callable(this.options);
    }

    /**
     * Resolve options.
     *
     * @return void
     */
    resolveOptions()
    {
        if(this.valuesAsClosure())
        {
            // this.options = h.call_user_func(this.options);
            // this.options = h.call_user_func(this.options, this.getRepository());

            // if(h.is_promise(result))
            // {
            //     console.log('is promise');
            //     element.options = yield result;
            // } else {
            //     element.options = result;
            // }

            // console.log(element.options);
        }
    }

    /**
     * Render input.
     *
     * @return {String}
     */
    renderInput()
    {
        let name = this.name;

        if(h.isset(this.attributes[MULTIPLE]) && this.attributes[MULTIPLE])
        {
            this.attributes['id'] = this.getIdAttribute(name, this.attributes);

            name = `${name}[]`;
        }

        let params = h.compact(
            [ 'element', this ],
            [ 'name', name ],
            [ 'options', this.options ],
            [ 'value', this.value ],
            [ 'h', h ]
        );

        if(h.isset(this.attributes[DEFAULT]) && this.attributes[DEFAULT])
        {
            let _default = this.attributes[DEFAULT];

            let result = h.is_callable(_default) ? _default() : _default;

            if(this.isValidDefaultValue(result))
            {
                params.default_val = result;
            }

            delete this.attributes[DEFAULT];
        }

        return f.view('form/type/templates/select.pug', params);
    }

    /**
     * Get attribute ID.
     *
     * @param name
     * @param attributes
     * @return {*}
     */
    getIdAttribute(name, attributes)
    {
        if(h.object_key_exists('id', this.attributes))
        {
            return attributes['id'];
        }

        if(h.isset(this.labels) && h.in_object(name, this.labels))
        {
            return name;
        }
    }

    /**
     * Check if value is valid
     *
     * @param result
     * @return {boolean}
     */
    isValidDefaultValue(result)
    {
        return h.is_object(result) && h.object_keys_exists([ KEY, VALUE ], result);
    }

    /**
     * Get default key.
     *
     * @return {string}
     */
    getDefaultValue()
    {
        return VALUE;
    }

    /**
     * Get default value
     *
     * @return {string}
     */
    getDefaultKey()
    {
        return KEY;
    }
}

module.exports = Select;