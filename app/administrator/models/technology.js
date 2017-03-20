let Repository = require('../../dashboard/administrator/repository');
let HasActive = require('../../dashboard/libraries/mixins/hasActive');

class Technology extends HasActive(Repository)
{
    /**
     * Technology constructor
     *
     * @return Technology
     */
    constructor()
    {
        super();
        this.table = 'technologies';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id',
            'name',
            'active',
        ];
    }
}

module.exports = Technology;