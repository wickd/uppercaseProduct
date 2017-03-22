let Repository = require('./repository');
let Construction = require(_namespace.app_path() + '/Construction');
let h = require('../dashboard/administrator/helpers');

class ConstructionsRepository extends Repository {

    /**
     * ConstructionsRepository constructor
     *
     * @return {ConstructionsRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Construction}
     */
    getModel()
    {
        return new Construction();
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
     * Get construction by slug name
     *
     * @param {string} slug
     * @return {Construction|null}
     */
    getBySlug(slug)
    {
        return this.getModel()
            .select()
            .where('slug', '=', slug)
            .where('active', '=', 1)
            .first()
    }
}

module.exports = ConstructionsRepository;