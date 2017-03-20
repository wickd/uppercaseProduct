let BaseRepository = require('./repository');
let admin = require('../../administrator/models/admin');
let bcrypt = require('../administrator/helpers/bcrypt');
let db = require('../administrator/db');
let config = require('config').db;
let query = require('squel').useFlavour(config.driver);

/**
 *
 */
class AdminRepository extends BaseRepository {

    /**
     *
     * @returns {*}
     */
    getModel() {
        return new admin();
    }

    /**
     *
     * @param email
     * @param password
     * @returns {*}
     */
    getByCredentials(email, password) {

        return db
            .first(query.select('*')
                .from(this.getTable())
                .where("email = ?", email))
            .then(row => [row, bcrypt.compare(password, row.password)])
            .spread((admin, is_ok) => is_ok ? admin : false)
    }

    /**
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
     *
     * @param email
     * @returns {*}
     */
    getByEmail(email) {
        return db.first(query.select('*')
            .from(this.getTable())
            .where("email = ?", email)
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

module.exports = AdminRepository;