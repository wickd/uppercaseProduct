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

    /**
     * Get slider constructions.
     *
     * @return {Collection|null}
     */
    getSliderPublic()
    {
        return this.getModel()
            .select()
            .where('active', '=', 1)
            .where('show_in_slider', '=', 1)
            .get();
    }

    /**
     * Get constructions from specifi category
     *
     * @param {Nuber} category_id
     * @return {Collection|null}
     */
    getCategoryConstructions(category_id)
    {
        return this.getModel()
            .select()
            .where('category_id', '=', category_id)
            .where('active', '=', 1)
            .get();
    }
}

module.exports = ConstructionsRepository;