let Repository = require('./repository');
let Category = require(_namespace.app_path() + '/Category');
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
     * @return {Category}
     */
    getModel()
    {
        return new Category();
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
     * Get category by slug name
     *
     * @param {string} slug
     * @return {Category|null}
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
     * Get by id.
     * 
     */
    getById(id)
    {
        return this.getModel()
            .find(id)
            .first();
    }
}

module.exports = CategoriesRepository;