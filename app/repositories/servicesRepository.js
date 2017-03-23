let Repository = require('./repository');
let Service = require(_namespace.app_path() + '/Service');
let h = require('../dashboard/administrator/helpers');

class CategoriesRepository extends Repository {

    /**
     * CategoriesRepository constructor
     *
     * @return {CategoriesRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Service}
     */
    getModel()
    {
        return new Service();
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
     * Get service by slug name
     *
     * @param {string} slug
     * @return {Service|null}
     */
    getBySlug(slug)
    {
        return this.getModel()
            .select()
            .where('slug','=', slug)
            .where('active','=',1)
            .first()
    }

    /**
     * Get first service.
     *
     * @return {Service|null}
     */
    getFirstService()
    {
        return this.getModel()
            .select()
            .first();
    }
}

module.exports = CategoriesRepository;