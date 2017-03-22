let Repository = require(_namespace.app_path() + '/dashboard/administrator/repository');
let HasActive = require(_namespace.app_path() + '/dashboard/libraries/mixins/hasActive');

class Contact extends HasActive(Repository)
{
    /**
     * Contact constroctor
     *
     * @return {Contact}
     */
    constructor()
    {
        super();
        this.table = 'contact_us';
        this.guarded = [ 'id' ];
        this.fillable = [
            'id'
            ,'name'
            ,'email'
            ,'subject'
            ,'message'
            ,'active'
        ];
    }
}

module.exports = Contact;