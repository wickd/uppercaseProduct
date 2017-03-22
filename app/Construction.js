let Translatable = require(_namespace.app_path() + '/dashboard/translatable/translatable');
let ConstructionTranslation = require(_namespace.app_path() + '/ConstructionTranslation');
let HasAttachements = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasAttachments');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');
let Sluggable = require(_namespace.app_path() + '/dashboard/libraries/mixins/sluggify');
let Category = require(_namespace.app_path() + '/Category');
let HasPresenter = require('presenter').mixin;
let ConstructionPresenter = require(_namespace.app_path() + '/presenters/constructionPresenter');

class Construction extends HasAttachements(HasPresenter(Sluggable(HasActive(Translatable))))
{
    /**
     * Construction constroctor
     *
     * @return {Construction}
     */
    constructor()
    {
        super();
        this.table = 'constructions';
        this.translationModel = ConstructionTranslation;
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'category_id', 'slug', 'active' ];
        this.translatedAttributes = [ 
            'name'
            ,'description'
            ,'long_description'
            ,'address'
            ,'beneficiary'
        ];

        this.presenter = ConstructionPresenter;
        this.translationForeignKey = 'construction_id';

        this.sluggable = [ 'slug' ];

        this.sluggifyOptions = {
            slug: {
                from: 'name',
                options: {lower: true}
            }
        };
    }

    /**
     * Get construction category.
     *
     * @relation: HasOne
     * @return {Categpry|null}
     */
    category()
    {
        return (new Category()).find('category_id').first();
    }
}

module.exports = Construction;