let Translatable = require(_namespace.app_path() + '/dashboard/translatable/translatable');
let PositionTranslation = require(_namespace.app_path() + '/PositionTranslation');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');
let HasPresenter = require('presenter').mixin;
let PositionPresenter = require(_namespace.app_path() + '/presenters/positionPresenter');

class Position extends HasPresenter(HasActive(Translatable))
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
        this.presenter = PositionPresenter;
        this.fillable = [ 'id', 'active' ];
        this.translatedAttributes = [ 'name' ];
        this.translationForeignKey = 'position_id';
    }
}

module.exports = Position;