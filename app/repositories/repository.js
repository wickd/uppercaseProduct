let squel = require('squel');

class Repository {

    /**
     * Repository constructor.
     *
     * @return Repository
     */
    constructor()
    {
        this.squel = squel;
    }

    /**
     * Get model by id.
     *
     * @param id
     * @return Model
     */
    getById(id)
    {
        return this.getModel()
            .find(id)
            .first();
    }

    /**
     * Get empty squel object.
     *
     * @return {*}
     */
    getSquel()
    {
        return this.squel;
    }
}

module.exports = Repository;