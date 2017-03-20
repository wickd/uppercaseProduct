let db = require('../administrator/db');
let query = require('squel');

class Repository
{
    /**
     * Get language by id.
     *
     * @param id
     * @returns {*}
     */
    getById(id) {
        return db.first(query.select('*')
            .from(this.getTable())
            .where('id = ?', id)
        );
    }

    /**
     * Get table name.
     *
     * @return string
     */
    getTable() {
        return this
            .getModel()
            .getTable();
    }
}

module.exports = Repository;