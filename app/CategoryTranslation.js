let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');

class CategoryTranslation extends Repository
{
    /**
     * CategoryTranslation constroctor
     *
     * @return {CategoryTranslation}
     */
    constructor()
    {
        super();
        this.table = 'category_translations';
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'category_id', 'language_id', 'name' ];
    }
}

module.exports = CategoryTranslation;