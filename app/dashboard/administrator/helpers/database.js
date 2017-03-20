let mysql = require('mysql');
let config = require('config').db;
let q = require('bluebird');
let squel = require('squel');
let h = require('../helpers');

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new mysql.createPool(config);

let database = {

    get: (query,params) => {
        let deferred = q.defer();
        query = query.toString();


        query = params ? mysql.format(query, params) : query;

        pool.getConnection(function(err, connection) {
            if (err) {
                throw err;
            }
            connection.query( query, params, function(err, rows) {
                if (err) {
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
     * @param the query SHOULD BE a squel object
     */
    first: (query) => {
        return database
            .get(query, [])
            .then((rows) => {
                if (rows && rows.length) {
                    return rows[0]
                }
                else{
                    return null;
                }
            })
    }
};

module.exports = database;