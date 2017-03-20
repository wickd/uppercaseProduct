/**
 * bcrypt helper
 * @param action
 * @returns {function(*, *, *)}
 */
let bcrypt = require('bcrypt-nodejs');
let promise = require('bluebird');
const iterations = 10;
const salt = bcrypt.genSaltSync(iterations);

/**
 * hashing
 * @param string
 * @returns {*}
 */
exports.hash = (string)=> {
    let promiseFn = promise.promisify(bcrypt.hash);
    return promiseFn(string, salt, null)
};
/**
 * salt generator
 * @returns {*}
 */
exports.genSalt = ()=> {
    let promiseFn = promise.promisify(bcrypt.genSalt,iterations);
    return promiseFn(iterations)
};

/**
 * salt generator
 * @returns {*}
 */
exports.hashSync = string => {
    return bcrypt.hashSync(string);
};

/**
 * hash compare
 * @param string
 * @param hash
 * @returns {*}
 */
exports.compare = (string,hash)=>{
    let promiseFn = promise.promisify(bcrypt.compare);
    return promiseFn(string,hash)
};