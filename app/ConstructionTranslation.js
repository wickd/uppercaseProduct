let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');

class ConstructionTranslation extends Repository
{
    /**
     * ConstructionTranslation constroctor
     *
     * @return {ConstructionTranslation}
     */
    constructor()
    {
        super();
        this.table = 'construction_translations';
        this.guarded = [ 'id' ];
        this.fillable = [ 
            'id'
            ,'construction_id'
            ,'language_id'
            ,'name'
            ,'description'
            ,'long_description'
            ,'address'
            ,'beneficiary'
        ];
    }
}

module.exports = ConstructionTranslation;