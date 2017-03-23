let Repository = require('./repository');
let Contact = require(_namespace.app_path() + '/Contact');
let h = require('../dashboard/administrator/helpers');

class ContactsRepository extends Repository {

    /** 
     * ContactsRepository constructor
     *
     * @return {ContactsRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Contact}
     */
    getModel()
    {
        return new Contact();
    }

    /**
     * Get public socials.
     *
     * @return {Collection|null}
     */
    getPublic()
    {
        return this.getModel()
            .getPublic();
    }

    /**
     * Create contact model.
     * 
     * @param {Object} data
     * @return {Boolean}
     */
    create(data)
    {
        return this.getModel()
            .create({
                name : data['name'] ? data['name'] : '',
                email : data['email'] ? data['email'] : '',
                subject : data['subject'] ? data['subject'] : '',
                message : data['message'] ? data['message'] : '',
                active : 1
            });
    }
}

module.exports = ContactsRepository;