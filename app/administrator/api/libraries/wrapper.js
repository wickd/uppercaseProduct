/**
 * generator module wrapper
 */
let wrap = require('co').wrap;
let h = require('../../../dashboard/administrator/helpers');

/**
 * exporter
 * @param path
 * @returns {*}
 */
module.exports = (path) => {

    let load = require.main.require(path);

    h.object_walk(load, (method, name) => {
        load[name] = wrap(method);
    });

    return load;

}


