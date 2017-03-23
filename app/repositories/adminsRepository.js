let Repository = require('./repository');
let Admin = require(_namespace.app_path() + '/Admin');
let h = require('../dashboard/administrator/helpers');
let bcrypt = require(_namespace.app_path() + '/dashboard/administrator/helpers/bcrypt');

class AdminsRepository extends Repository {

    /**
     * AdminsRepository constructor
     *
     * @return {AdminsRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Admin}
     */
    getModel()
    {
        return new Admin();
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
     * Get admin by credentials.
     *
     * @param {string} email
     * @param {string} password
     * @return {*}
     */
    getByCredentials(email, password)
    {
        return this.getModel()
            .select()
            .where('email', '=', email)
            .first()
            .then(admin => admin && bcrypt.compare(password, admin.password));
    }
}

module.exports = AdminsRepository;