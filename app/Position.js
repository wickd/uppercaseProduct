let Translatable = require(_namespace.app_path() + '/dashboard/translatable/translatable');
let PositionTranslation = require(_namespace.app_path() + '/PositionTranslation');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');

class Position extends HasActive(Translatable)
{
    /**
     * Position constroctor
     *
     * @return {Position}
     */
    constructor()
    {
        super();
        this.table = 'positions';
        this.translationModel = PositionTranslation;
        this.guarded = [ 'id' ];
        this.fillable = [ 'id', 'active' ];
        this.translatedAttributes = [ 'name' ];
        this.translationForeignKey = 'position_id';
    }
}

module.exports = Position;