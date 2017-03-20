let Text = require('./text');
let h = require('../../helpers');
let f = require('../../helpers/functions');

const CODE = 'country_code';
const MASK = 'mask';
const DEFAULT_CODE = '+373';

class Tel extends Text {

    constructor(name)
    {
        super(name);

        this.attributes = {
            style:'width: 300px;',
            class:'form-control'
        };

        this.rules = {};
    }

    getCountryCode()
    {
        let country_code = this.attributes[CODE];

        if(h.is_undef(country_code))
        {
            country_code = DEFAULT_CODE;
        }

        return country_code;
    }

    /**
     * get mask
     *
     * @return {*}
     */
    getMask()
    {
        return this.attributes[MASK];
    }


    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return f.view('./form/type/templates/tel.pug', { element: this, h: h });
    }
}

module.exports = Tel;