let Flexible = require('../flexible');
let h = require('../../helpers');

const FLEXIBLE = 'flexible';
const TRUE = 'true';
const FALSE = 'false';

class Flex extends Flexible {

    constructor(name, options)
    {
        super(name, options);

        this.options = options;
    }

    /**
     * Render text input.
     *
     * @return {string}
     */
    renderInput()
    {
        return 'flex';
    }

    resolveElement()
    {
        let o = this.options;
        let flex = o[FLEXIBLE];
        let res = {};

        if(h.isset(o[TRUE]) && h.isset(o[FALSE]))
        {
            switch (typeof flex)
            {
                case h.BOOL :
                    res = flex;
                    break;

                case h.FUNCTION :
                    res = Boolean(flex(this.getRepository()));
                    break;

                default :
                    res = Boolean(flex);
                    break;
            }
        }

        return res ? o[TRUE] : o[FALSE];
    }
}

module.exports = Flex;