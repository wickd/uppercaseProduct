let Checkboxable = require('../checkboxable');
let f = require('../../helpers/functions');
let h = require('../../helpers');
const BOOL_TYPE = 'bool_type';
const BOOL_TYPE_DEFAULT = 'default';
const BOOL_TYPE_ICHECK = 'iCheck';

class Bool extends Checkboxable {

    constructor(name)
    {
        super(name);
        this.pattern = '_:checkbox:_';
    }

    renderInput()
    {
        return f.view(`form/type/templates/checkboxes/${this.getBoolType()}.pug`, h.compact(
            [ 'element', this ]
        ))
    }

    getBoolType()
    {
        if(h.isset(this.attributes[BOOL_TYPE]))
        {
            switch(this.attributes[BOOL_TYPE]) {
                case BOOL_TYPE_ICHECK :
                    // todo: temporar resolve. stuff is hardcoded.
                    delete this.attributes['class'];
                    return BOOL_TYPE_ICHECK;
                    break;
            }
        } else {
            // return BOOL_TYPE_DEFAULT;
            // Used iCheck as default.
            return BOOL_TYPE_ICHECK;
        }
    }

    /**
     * Get new name.
     *
     * @return {string}
     */
    getNewName()
    {
        return this.pattern + this.getName();
    }
}

module.exports = Bool;