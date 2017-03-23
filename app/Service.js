let Translatable = require(_namespace.app_path() + '/dashboard/translatable/translatable');
let ServiceTranslation = require(_namespace.app_path() + '/ServiceTranslation');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');
let HasAttachements = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasAttachments');
let Sluggable = require(_namespace.app_path() + '/dashboard/libraries/mixins/sluggify');
let HasPresenter = require('presenter').mixin;
let ServicePresenter = require(_namespace.app_path() + '/presenters/servicePresenter');

class Service extends HasPresenter(HasAttachements(Sluggable(HasActive(Translatable))))
{
    /**
     * Service constroctor
     *
     * @return {Service}
     */
    constructor()
    {
        super();
        this.table = 'services';
        this.translationModel = ServiceTranslation;
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'slug', 'active' ];
        this.translatedAttributes = [ 'name', 'description' ];
        this.translationForeignKey = 'service_id';

        this.sluggable = [ 'slug' ];
        this.presenter = ServicePresenter;

        this.sluggifyOptions = {
            slug: {
                from: 'name',
                options: {lower: true}
            }
        };
    }
}

module.exports = Service;