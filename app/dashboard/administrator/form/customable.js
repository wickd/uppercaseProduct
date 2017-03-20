let Element = require('./element');
let h = require('../helpers');
const BODY = 'body';

class Customable extends Element {

    constructor(name)
    {
        super(name);

        this.body = {};
    }

    /**
     * Set body.
     *
     * @param body
     * @return {Customable}
     */
    setBody(body)
    {
        this.body = body;

        return this;
    }

    getBody(){
        return this.body;
    }

    /**
     * Render body.
     *
     * @return {{}}
     */
    renderBody(element)
    {
        let body = {};

        if(h.is_callable(this.body))
        {
            body = this.body(element);
        } else if(h.is_string(this.body))
        {
            body = this.body;
        }else {
            throw new Error(`Custom type must be string or callback.`);
        }

        return body;
    }
}

module.exports = Customable;