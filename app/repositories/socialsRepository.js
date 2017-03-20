let Repository = require('./repository');
let Social = require('../administrator/models/social');
let h = require('../dashboard/administrator/helpers');

class SocialsRepository extends Repository {

    /**
     * SocialsRepository constructor
     *
     * @return SocialsRepository
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Social}
     */
    getModel()
    {
        return new Social();
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
     * Get socials by name
     *
     * @param name
     * @return {Social}
     */
    getByName(name)
    {
        return this.getModel()
            .select()
            .where('name','=',name)
            .where('active','=',1)
            .first()
    }
}

module.exports = SocialsRepository;