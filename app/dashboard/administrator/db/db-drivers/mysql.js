/**
 * Database connector
 */
let mysql = require('mysql');
let config = require('config').db;
let q = require('bluebird');

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
let pool = new mysql.createPool(config);

/**
 * squel options
 * @type {{autoQuoteFieldNames: boolean, autoQuoteTableNames: boolean}}
 */
const OPTIONS =    {
    autoQuoteFieldNames: true,
    autoQuoteTableNames: true
};

/**
 * driver
 * @type {{execute: ((p1?:*)), _format: ((p1:*))}}
 */
let driver = {
    options : OPTIONS,
    /**
     * get query
     * @param query
     * @param params
     */
    execute: (squelClass) => {

        let deferred = q.defer();

        let [query, params] = driver._format(squelClass);

        pool.getConnection(function (err, connection) {

            if (err) {
                throw err;
            }

            connection.query(query, params, function (err, rows) {

                if (err) {
                    console.log(query);
                    console.log(err);

                    deferred.resolve(null);
                }

                connection.release();
                deferred.resolve(rows);
            });
        });

        return deferred.promise;
    },
    /**
     * query formatter
     * @param query
     * @param params
     * @returns {[*,*]}
     * @private
     */
    _format: (squelClass) => {
        squelClass.updateOptions(driver.options);

        driver.options = OPTIONS;//reset

        let data = squelClass.toParam();
        //formatter
        return [data.text, data.values];
    }
};

module.exports = driver;