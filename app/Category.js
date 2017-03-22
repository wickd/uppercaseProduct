let Translatable = require(_namespace.app_path() + '/dashboard/translatable/translatable');
let CategoryTranslation = require(_namespace.app_path() + '/CategoryTranslation');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');
let Sluggable = require(_namespace.app_path() + '/dashboard/libraries/mixins/sluggify');

class Category extends Sluggable(HasActive(Translatable))
{
    /**
     * Category constroctor
     *
     * @return {Category}
     */
    constructor()
    {
        super();
        this.table = 'categories';
        this.translationModel = CategoryTranslation;
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'slug', 'active' ];
        this.translatedAttributes = [ 'name' ];
        this.translationForeignKey = 'category_id';

        this.sluggable = [ 'slug' ];

        this.sluggifyOptions = {
            slug: {
                from: 'name',
                options: {lower: true}
            }
        };
    }
}

module.exports = Category;