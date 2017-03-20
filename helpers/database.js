let mysql = require('mysql');
let config = require('config').db;
let q = require('bluebird');
let squel = require('squel');

let CacheHandler = require('../libraries/cache');
let clientCache =  CacheHandler(config);
var crypto = require('crypto');
//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new mysql.createPool(config);

let database = {

    /**
     * default
     * @param query
     * @param params
     * @returns {*}
     * @private
     */
    _sql: (query, params)=> {

        let deferred = q.defer();
        query = query.toString();
        query = params ? mysql.format(query, params) : query;

        pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            connection.query(query, params, function (err, rows) {
                if (err) {
                    console.log(err);
                }

                connection.release();
                deferred.resolve(rows);
            });


        });

        return deferred.promise;
    },


    /**
     * cached
     * @param query
     * @param params
     * @returns {*}
     * @private
     */
    _cache: (options, query, params)=> {

        let deferred = q.defer();
        let key = crypto.createHash('md5').update(`${query}${params}`).digest("hex");

        //clientCache.delete(`test`,()=>{});

        clientCache.get(key,  (err, data)=> {

            if (err) {
                console.log(err);
            }

            if (!data) {
                database
                    ._sql(query, params)
                    .then(rows=> {
                        clientCache.set(key, rows, (err, data)=> {
                            if (err) {
                                console.log(err);
                            }
                            deferred.resolve(rows);
                        })
                    })
            }
            else {
                deferred.resolve(data);
            }

        });

        return deferred.promise;

    },

    /**
     * default db query
     * @param query
     * @param params
     * @returns {*}
     */
    query: (query, params) => {

        return config.cacheOptions || config.cacheOptions!=='disabled'
            ? database._cache(config.cacheOptions, query, params)
            : database._sql(query, params);
    },

    /**
     * @param query HAVE TO BE a squel object
     */
    getOne: (query) => {
        return database
            .query(query, [])
            .then((rows) => {
                if (rows && rows.length) {
                    return rows[0]
                }
                else {
                    return null;
                }
            })
    }
};

module.exports = database;