let Repository = require('./repository');
let Position = require(_namespace.app_path() + '/Position');
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
     * @return {Position}
     */
    getModel()
    {
        return new Position();
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
     * Get position by name
     *
     * @param {string} name
     * @return {Position|null}
     */
    getByName(name)
    {
        return this.getModel()
            .select()
            .where('name','=', name)
            .where('active','=',1)
            .first()
    }
}

module.exports = CategoriesRepository;