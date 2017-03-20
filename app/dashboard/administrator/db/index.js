/**
 * Database connector
 */
let driverOp = require('config').get('db.driver') || 'mysql';
let driver = require(`./db-drivers/${driverOp}`);

/**
 * main connecter
 * @type {{get: ((p1?:*)), first: ((p1?:*))}}
 */
let database = {
    /**
     * get query
     * @param query
     * @param params
     */
    get: (squelClass) => {
        return driver.execute(squelClass)
    },

    /** get first element from result
     * the query SHOULD BE a squel object
     * @param query
     */
    first: (squelClass) => {
        return database
            .get(squelClass)
            .then((rows) => {

                if (rows && rows.length) {
                    return rows[0];
                }
                else {
                    return null;
                }

            })
    },
    /**
     * override driver options
     * @param options
     * @returns {database}
     */
    options(options = null)
    {
        driver.options = options;
        return this;
    }
};

module.exports = database;