let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');

class Language extends HasActive(Repository)
{
    /**
     * Language constroctor
     *
     * @return {Language}
     */
    constructor()
    {
        super();
        this.table = 'languages';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id',
            'title',
            'slug',
            'active'
        ];
    }
}

module.exports = Language;