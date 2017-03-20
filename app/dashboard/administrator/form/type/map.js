let Element = require('../element');
let f = require('../../helpers/functions');
let h = require('../../helpers');
let c = require('../../config');

class Map extends Element {

    constructor(name)
    {
        super(name);

        this.lat = '';
        this.lon = '';

        this.attributes = {
            style: 'width: 500px; height: 250px; border:1px solid #e5e6e7;'
        }
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return f.view('form/type/templates/map.pug', {
            element: this,
            lat: this.lat,
            lon: this.lon,
            mapId: this.getName()
        });
    }

    getValue(arg, default_val = null)
    {
        if(! h.is_null(this.value) && h.isset(this.value[arg]))
        {
            return this.value[arg];
        }

        // todo: default lat/lan.
        return default_val ? default_val : '';
    }

    extractValueFromModel()
    {
        let model = this.getRepository();

        if(! h.isset(this.attributes.latitude))
        {
            console.log('Invalid field name input for latitude');
        }

        this.lat = this.attributes.latitude;

        if(! h.isset(this.attributes.longitude))
        {
            console.log('Invalid field name input for longitude');
        }

        this.lon = this.attributes.longitude;

        if(h.is_null(model))
        {
            return this.setValue('');
        }

        this.setValue({
            lat: this.getRepository()[this.lat],
            lon: this.getRepository()[this.lon]
        });
    }

    getLat()
    {
        return this.attributes.latitude;
    }

    getLon()
    {
        return this.attributes.longitude;
    }
}

module.exports = Map;