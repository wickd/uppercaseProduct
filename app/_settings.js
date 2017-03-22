let Repository = require('./dashboard/administrator/repository');
let HasActive = require('./dashboard/libraries/mixins/hasActive');
let h = require('./dashboard/administrator/helpers');

class Option extends HasActive(Repository)
{
    /**
     * Option constructor
     *
     * @return Option
     */
    constructor()
    {
        super();
        this.table = 'options';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id',
            'key_name',
            'value',
            'group',
            'active'
        ];
    }
}

module.exports = Option;