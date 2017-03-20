let Repository = require('../administrator/repository');

class Language extends Repository {

    /**
     * Language constructor.
     *
     * @return void
     */
    constructor()
    {
        super();
        this.table = 'languages';
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'title', 'slug', 'active', 'def' ];
    }
}

module.exports = Language;