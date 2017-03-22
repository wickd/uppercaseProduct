let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');

class PositionTranslation extends Repository
{
    /**
     * PositionTranslation constroctor
     *
     * @return {PositionTranslation}
     */
    constructor()
    {
        super();
        this.table = 'position_translations';
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'position_id', 'language_id', 'name' ];
    }
}

module.exports = PositionTranslation;