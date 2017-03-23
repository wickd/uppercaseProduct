let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');

class ServiceTranslation extends Repository
{
    /**
     * ServiceTranslation constroctor
     *
     * @return {ServiceTranslation}
     */
    constructor()
    {
        super();
        this.table = 'service_translations';
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'service_id', 'language_id', 'name', 'description' ];
    }
}

module.exports = ServiceTranslation;