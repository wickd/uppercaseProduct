let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');
let HasAttachements = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasAttachments');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');
let Position = require(_namespace.app_path() + '/position');
// let Presenterable = require('presenter').mixin;

class CareerRequest extends HasActive(HasAttachements(Repository))
{
    /**
     * CareerRequest constroctor
     *
     * @return {CareerRequest}
     */
    constructor()
    {
        super();
        this.table = 'career_requests';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id',
            'position_id',
            'firstname',
            'lastname',
            'email',
            'active'
        ];
    }

    /**
     * Get career request position.
     *
     * @relation HasOne
     * @return {Position|null}
     */
    position()
    {
    	return (new Position()).find(this.getAttribute('position_id')).first();
    }
}

module.exports = CareerRequest;