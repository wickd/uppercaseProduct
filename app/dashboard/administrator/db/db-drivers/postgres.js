let pg = require('pg');
let config = require('config').db;
let q = require('bluebird');
let squel = require('squel');


/**
 * squel options
 * @type {{autoQuoteFieldNames: boolean, autoQuoteTableNames: boolean}}
 */
const OPTIONS = {
    autoQuoteFieldNames: true,
    autoQuoteTableNames: true,
    nameQuoteCharacter: '"',
    tableAliasQuoteCharacter: '"',
    fieldAliasQuoteCharacter: '"'
}


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
let pool = new pg.Pool(config);
pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.log('idle client error', err.message, err.stack)

})

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

        pool.connect((err, client, done) => {
            if (err) {
                console.log('error fetching client from pool', err);
                deferred.reject(err)
                done();
            }


            client.query(query, params, (err, result) => {
                if (err) {
                    //global.tracer.error(query)
                    //  tracer.error('error running query', err)
                    console.log(err.stack)
                    deferred.resolve([])
                }
                else {
                    deferred.resolve(result.rows)
                }

                done()
            })
        })

        // to run a query we can acquire a client from the pool,
        // run a query on the client, and then return the client to the pool

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

        let data = squelClass.toParam();
        //formatter
        return [data.text, data.values];
    }
};

module.exports = driver;