'use strict';
/**
 *In memory store
 * @constructor
 */
function MemoryStore() {

    this.store = {};
}
/**
 *
 * @param key
 * @param cb
 * @returns {*}
 */
MemoryStore.prototype.get = function get(key, cb) {
    var val = this.store[key];
    return cb(null, !val ? null : JSON.parse(val));
};
/**
 *
 * @param key
 * @param val
 * @param cb
 * @returns {*}
 */
MemoryStore.prototype.set = function set(key, val, cb) {
    this.store[key] = !val ? null : JSON.stringify(val);
    return cb(null, val);
};
/**
 *
 * @param key
 * @param cb
 * @returns {*}
 */
MemoryStore.prototype.delete = function del(key, cb) {
    delete this.store[key];
    return cb(null);
};
/**
 *
 * @param cb
 */
MemoryStore.prototype.clear = function clear(cb) {
    this.store = {};
    cb(null);
};
/**
 *
 * @param cb
 */
MemoryStore.prototype.size = function dbsize(cb) {
    var arr = this.store;
    cb(null, Object.keys(arr).length);
};


module.exports = MemoryStore;