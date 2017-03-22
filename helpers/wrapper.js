let wrap = require('co').wrap;
let h = require(_namespace.app_path() + '/dashboard/administrator/helpers');

/**
 * Wrapper co for generators.
 * 
 * @param {String} path Path to module.
 * @return {Module}
 */
module.exports = (path) =>
{
    let load = {};

    try {
        load = require.main.require(path);
        h.object_walk(load, (method, name) => {
            load[name] = wrap(method);
        });
    }
    catch (e) {
        console.log(e);
    }

    return load;
};