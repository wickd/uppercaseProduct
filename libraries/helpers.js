/**
 * Helpers functions..
 *
 * @dependencies: ECMAScript 6.0
 */
let util = require('util');
const OBJ_KEY = 2;
const OBJ_BOTH = 1;
const OBJ_VAL = 3;

// Data Types.
const NUMBER = 'number';
const OBJECT = 'object';
const STRING = 'string';
const BOOL = 'boolean';
const FUNCTION = 'function';
const NAN = 'NaN';

exports.OBJ_BOTH = 1;
exports.OBJ_KEY = 2;
exports.OBJ_VAL = 3;
exports.NUMBER = NUMBER;
exports.OBJECT = OBJECT;
exports.STRING = STRING;
exports.BOOL = BOOL;
exports.FUNCTION = FUNCTION;
exports.NAN = NAN;

/** + -------------------------------------------
 *  |    Boolean helpers
 *  + -------------------------------------------
 */

/**
 * Check if incoming value is number.
 *
 * @param value
 * @return {boolean}
 */
exports.isNumber = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
/**
 * Check if incoming value is STRICT number.
 * @warning this function returns true only if incoming number. not stringify number.
 *
 * @param value
 * @return {boolean}
 */
exports.is_number = value => {
    return !isNaN(parseFloat(value)) && isFinite(value) && typeof value === NUMBER;
};

/**
 * Check if incoming value numeric. If number is a string, convert it and check.
 *
 * @param value
 * @return {boolean}
 */
exports.isNumeric = value => {
    return !isNaN(Number(value));
};

/**
 * @alias for exports.isNumeric();
 *
 * @param value
 * @return {boolean}
 */
exports.is_numeric = value => {
    return !isNaN(Number(value));
};

/**
 * Check if incoming value is a instance class.
 *
 * @param value
 * @return {boolean}
 */
exports.isConstructor = value => {
    return typeof value == FUNCTION && !!value['constructor'];
};

/**
 * Check if incoming value is a instance class.
 *
 * @param value
 * @return {boolean}
 */
exports.is_constructor = value => {
    return (typeof value == FUNCTION) && !!value['constructor'];
};

/**
 * Check if type value is boolean.
 *
 * @param value
 * @returns {boolean}
 */
exports.isBool = value => {
    return (typeof value == BOOL);
};
/**
 * Check if type value is boolean.
 *
 * @param value
 * @returns {boolean}
 */
exports.is_bool = value => {
    return (typeof value == BOOL);
};

/**
 * Check if incoming value is object..
 *
 * @param value
 * @return {boolean}
 */
exports.isObject = value => {
    return (typeof value == OBJECT || value instanceof Object);
};
/**
 * Check if incoming value is object..
 *
 * @param value
 * @return {boolean}
 */
exports.is_object = value => {
    return (typeof value == OBJECT || value instanceof Object);
};

/**
 * Check if value is string.
 *
 * @param value
 * @return {boolean}
 */
exports.isString = value => {
    return (typeof value === STRING || value instanceof String);
};
/**
 * Check if value is string.
 *
 * @param value
 * @return {boolean}
 */
exports.is_string = value => {
    return (typeof value === STRING || value instanceof String);
};

/**
 * Check if value is a hex.
 *
 * @param {String} value
 * @return {boolean}
 */
exports.isHex = value => {
    let re = /^#[0-9A-F]{6}$/i;

    return re.test(value);
};

/**
 * Check if value is a hex.
 *
 * @param {String} value
 * @return {boolean}
 */
exports.is_hex = value => {
    let re = /^#[0-9A-F]{6}$/i;

    return re.test(value);
};
/**
 * Check if value is undefined
 *
 * @param value
 * @return {boolean}
 */
exports.isUndef = value => {
    return value === undefined;
};
/**
 * Check if value is undefined
 *
 * @param value
 * @return {boolean}
 */
exports.is_undef = value => {
    return value === undefined;
};

/**
 * Check if value is a function.
 *
 * @param value
 * @return {boolean}
 */
exports.isCallable = value => {
    return typeof value === FUNCTION;
};
/**
 * Check if value is a function.
 *
 * @param value
 * @return {boolean}
 */
exports.is_callable = value => {
    return typeof value === FUNCTION;
};

/**
 * Check if value is null.
 *
 * @param value
 * @return {boolean}
 */
exports.isNull = value => {
    return value === null;
};
/**
 * Check if value is null.
 *
 * @param value
 * @return {boolean}
 */
exports.is_null = value => {
    return value === null;
};

/**
 * Check if value exists in object as value of some key
 *
 * @param value
 * @param object
 * @return {boolean}
 */
exports.inObject = (value, object) => {
    let result = false;

    Object.keys(object).forEach(key => {
        if (object[key] == value) {
            result = true;
        }
    });

    return result;
};

/**
 * Check if object is instance of a Promise.
 *
 * @param obj
 * @returns {boolean}
 */
exports.is_promise = obj => {
    return obj instanceof Promise;
};

/**
 * Check if object is instance of a Promise.
 *
 * @param obj
 * @returns {boolean}
 */
exports.isPromise = obj => {
    return obj instanceof Promise;
};

/**
 * Check if value exists in object as value of some key
 *
 * @param value
 * @param object
 * @return {boolean}
 */
exports.in_object = (value, object) => {
    let result = false;

    Object.keys(object).forEach(key => {
        if (object[key] == value) {
            result = true;
        }
    });

    return result;
};

/**
 * Check if value is set.
 *
 * @param value
 * @return {boolean}
 */
exports.isset = value => {
    return value !== undefined;
};

/** + -------------------------------------------
 *  |    String helpers..
 *  + -------------------------------------------
 */

/**
 * Check if value is empty string. Can be used on {String|Object}
 *
 * @param value
 * @return {boolean}
 */
exports.empty = value => {
    if (value === undefined || null == value || null === value) {
        return true;
    }

    if (value instanceof Array) {
        return Object.keys(value).length === 0;
    }

    if (typeof value === OBJECT || value instanceof Object) {
        return Object.keys(value).length === 0;
    }

    return value.length === 0;
};
exports.is_empty = value => {
    return exports.empty(value);
};

/**
 * Returns lust element|key|value from object.
 *
 * @param object
 * @param element {1: element(both), 2: only key, 3: value}
 */
exports.last = (object, element = OBJ_KEY) => {
    if (object !== null || object !== undefined) {
        let i = 0, last = {};

        Object.keys(object).forEach(key => {
            if (i == (Object.keys(object).length - 1)) {
                switch (element) {
                    case OBJ_BOTH :
                        last[key] = object[key];
                        break;

                    case OBJ_VAL :
                        last = object[key];
                        break;

                    default:
                        last = key;
                        break;
                }
            }

            i++;
        });

        return last;
    }

    return null;
};

/**
 * Get the first element from object.
 *
 * @param object
 * @param element
 * @return {*}
 */
exports.first = (object, element = OBJ_KEY) => {

    // Object.keys(obj)[0]; // It better
    // -- or --
    // for (var a in obj) return a;

    if (object !== null || object !== undefined) {
        let i = 0, first = {};

        Object.keys(object).forEach(key => {
            if (i == 0) {
                switch (element) {
                    case OBJ_BOTH :
                        first[key] = object[key];
                        break;

                    case OBJ_VAL :
                        first = object[key];
                        break;

                    default:
                        first = key;
                        break;
                }
            }

            // break;
            i++;
        });

        return first;
    }

    return null;
};

/**
 * Make first character of string in uppercase.
 *
 * @param string
 * @return {string}
 */
exports.uc_first = string => {
    return string
        ? string.charAt(0).toUpperCase() + string.slice(1)
        : string;
};

/**
 * The same like php. Compares to strings.
 *
 * @param str1
 * @param str2
 * @return {number}
 */
exports.strcmp = (str1, str2) => {
    let out = -1;

    if (str1.length < str2.length) {
        out = -1;
    } else if (str1.length > str2.length) {
        out = 1;
    } else if (str1 == str2) {
        out = 0;
    }

    return out;
};

/**
 * String to lower case.
 *
 * @param string
 * @return {string}
 */
exports.to_lower_case = string => {
    return String(string).toLowerCase();
};

/**
 * The same as php explode function.
 *
 * @param delimiter
 * @param string
 * @param limit
 * @return array
 */
exports.explode = (delimiter, string, limit = 0) => {
    let out = string.split(delimiter);

    if (limit) {
        let temp = [];

        for (let i = 0; i < limit; i++) {
            temp[i] = out[i];
        }

        out = temp;
    }

    return out;
};

/** + -------------------------------------------
 *  |    Object operations&iteration helpers..
 *  + -------------------------------------------
 */

/**
 * Merge arrays or objects.
 *
 * @param object1
 * @param object2
 * @return {*}
 */
exports.merge = (object1, object2) => {

    Object.keys(object2).forEach(key => {
        object1[key] = object2[key];
    });

    return object1;
};

exports.object_merge = (object1, object2) => {
    let object3 = [];

    Object.keys(object1).forEach(key => {
        object3[key] = object1[key];
    });

    Object.keys(object2).forEach(key => {
        object3[key] = object2[key];
    });

    return object3;
};

/**
 * Merge objects or arrays with their keys.
 *
 * @param object1
 * @param object2
 * @return {*}
 */
exports.merge_options = (object1, object2) => {

    var object3 = {};

    Object.keys(object1).forEach(key => {
        object3[key] = object1[key];
    });

    Object.keys(object2).forEach(key => {
        object3[key] = object2[key];
    });

    return object3;
};

/**
 * Merge object1 source object with object2 object, and
 * on each merge element apply filter, if it returns true element
 * will be merged.
 *
 * @param {Object} object1
 * @param {Object} object2
 * @param {Function|Boolean|String} callback
 * return {*}
 */
exports.object_merge_filter = (object1, object2, callback) => {
    Object.keys(object2).forEach(key => {
        let value = object2[key];

        if (callback(key, value)) {
            object1[key] = object2[key];
        }
    });

    return object1;
};

/**
 * Foreach for objects.
 *
 * @param object
 * @param callback
 */
exports.each = (object, callback) => {

    if (object)
        Object.keys(object).forEach(key => {
            let value = object[key];

            callback(value, key);
        });

};

/**
 * Pushing callback result's value to object, execute callback
 * on each element of object and push the result to end of object.
 * The returned value of callback will be pushed to object.
 * Callback MUST return an a value.
 *
 * @param {Object} object
 * @param {Function} callback
 * @param {Boolean} saveKey
 * @return {Object}
 */
exports.object_walk = (object, callback, saveKey = false) => {
    let temp = {};
    let i = 0;

    if (object) {
        Object.keys(object).forEach(key => {
            let value = object[key];

            let index = saveKey ? key : i;

            temp[index] = callback(value, key);

            i++;
        });
    }

    return temp;
};

/**
 * Object except.
 *
 * @param object
 * @param args
 * @return {*}
 */
exports.object_except = (object, ...args) => {
    let target = {};

    for (let i in object) {
        if (args.indexOf(i) >= 0)
            continue;

        if (!Object.prototype.hasOwnProperty.call(object, i))
            continue;

        target[i] = object[i];
    }

    return target;
};

/**
 * Apply callback as filter for each element on iteration
 * of object massive.
 *
 * @param {Object} object
 * @param {Function} callback
 * @return {{}}
 */
exports.object_filter = (object, callback) => {
    let temp = {};
    let i = 0;

    Object.keys(object).forEach(key => {
        let value = object[key];

        if (Boolean(callback(value, key))) {
            temp[key] = value;
        }

        i++;
    });

    return temp;
};

/**
 * Check if key exists in object.
 *
 * @param key
 * @param object
 * @return {boolean}
 */
exports.object_key_exists = (key, object) => {
    return key in object;
};

/**
 * Check if all incoming keys exists in object
 *
 * @param {Array} keys
 * @param object
 * @return {boolean}
 */
exports.object_keys_exists = (keys, object) => {
    let result = true;

    if (typeof keys == OBJECT) {
        for (let i = 0; i < keys.length; i++) {

            if (keys[i] in object) {
                continue;
            }

            result = false;
            break;
        }

        return result;
    }

    return false
};

/**
 * The same as object_key_exists.
 *
 * @param {string} key
 * @param {Object} object
 * @return {Boolean}
 */
exports.property_exists = (key, object) => {
    return object.hasOwnProperty(key);
};

/**
 * Compares object1 against object2 and returns the difference.
 * Returns an array containing all the values from object1
 * that are not present in any of the other objects.
 *
 * @param {Object} object1
 * @param {Object} object2
 */
exports.object_diff_assoc = (object1, object2) => {
    let temp = {};

    Object.keys(object1).forEach(key => {
        let value = object1[key];

        if (!(key in object2)) {
            temp[key] = value;
        }
    });

    return temp;
};

/**
 * Object pop is the same from array_pop PHP.
 * Removes from source object the last key and return it.
 *
 * @param {{}} object
 * @return {{}}
 */
exports.object_pop = object => {
    let i = 0;
    let last = {};
    Object.keys(object).forEach(key => {
        let value = object[key];

        if (i == object.length) {
            last[key] = value;

            delete object[key];
        }

        i++;
    });

    return last;
};

/**
 * The same like array_flip from PHP. Changes keys with values.
 * If values is the same, the second override the first.
 *
 * @param object
 * @return {{}}
 */
exports.object_flip = object => {
    let temp = {};

    Object.keys(object).forEach(key => {
        temp[object[key]] = key;
    });

    return temp;
};

/**
 * Object keys is similar like array_keys from php.
 *
 * @param {{}} object
 * @param {string|null}search_value
 * @returns {{}}
 */
exports.object_keys = (object, search_value = null) => {
    let temp = {};
    let i = 0;

    Object.keys(object).forEach(key => {
        let value = object[key];

        if (search_value != null && typeof search_value == STRING) {
            if (value == search_value) {
                temp[i] = key;
            }
        } else if (search_value != null && typeof search_value == OBJECT) {
            // probably not work fine.
            Object.keys(search_value).forEach(k => {
                temp[i] = k;
            });
        } else {
            temp[i] = key;
        }

        i++;
    });

    return temp;
};

/**
 * Returns an object containing all the elements of objects
 * after applying the callback function to each one
 *
 * @param callback
 * @param object
 * @return {{}}
 */
exports.object_map = (callback, object) => {
    let temp = {};

    Object.keys(object).forEach(object_key => {
        let object_value = object[object_key];

        temp[object_key] = callback(object_value);
    });

    return temp;
};

/**
 * map class methods, except constructor
 * @param Class
 * @param callback
 */
exports.each_method = (Class, callback) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(Class))
        .map((name) => {
            //skip class constructor
            if (!(this[name] instanceof Function)) {
                callback(name)
            }
        });
}

/**
 * Check if search element in object.
 *
 * @param {String} search
 * @param {Object} object
 * @param {Number|OBJ_VAL} needle
 * @return {boolean}
 */
exports.exists_in_object = (search, object, needle = OBJ_VAL) => {
    let temp = false;

    Object.keys(object).forEach(object_key => {
        let object_value = object[object_key];

        if (!temp) {
            switch (needle) {
                case OBJ_VAL:
                    temp = String(search) == String(object_value);
                    break;
                case OBJ_KEY:
                    temp = String(search) == String(object_key);
                    break;
                case OBJ_BOTH:
                    temp = String(search) == String(object_value) && String(search) == String(object_key);
                    break;
            }
        }
    });

    return temp;
};

/**
 * Pushing int object the value to keys in series.
 *
 * @param {Object} object
 * @param {*} value
 * @param {Array} keys
 * @returns {*}
 */
exports.push_experiment = (object, value, keys) => {
    if (typeof keys == OBJECT) {
        if (keys.length > 1) {
            for (let i = 0; i < keys.length; i++) {
                let key_name = keys[i];

                if (object[key_name] == undefined) {
                    // if (i != keys.length) {
                    if (i != (keys.length - 1)) {
                        object[key_name] = {};
                        // console.log(object);
                    } else {
                        object[key_name] = value
                    }

                    object = object[key_name];
                } else {
                    console.log(object);
                }
            }
        } else {
            object[keys] = value;
        }
    } else if (typeof keys == STRING) {
        object[keys] = value;
    }

    return object;
};

/**
 * Push to object.
 *
 * @param object
 * @param value
 * @param keys
 * @returns {*}
 */
exports.push = (object, value, keys) => {

    // function assignKey(object, value, key)
    // {
    //
    // }

    if (typeof keys == STRING) {
        object[keys] = value;
    } else if (typeof  keys == OBJECT) {
        for (let i = 0; i < keys.length; i++) {
            let key_name = keys[i];

            // assignKey(object, (i != (keys.length - 1) ? assignKey(object, ) : value), key_name);
        }
    }

    return object;
};

/** + -------------------------------------------
 *  |    Class helpers ecma6 ..
 *  + -------------------------------------------
 */

/**
 * Get class.
 *
 * @param obj
 * @return {*}
 */
exports.get_class = obj => {
    if (obj instanceof Object && !(obj instanceof Array) && !(obj instanceof Function) && obj.constructor) {
        return obj.constructor.name;
    }

    return false;
};

/**
 * Die in dump.#FF5733
 *
 * @param args
 */
exports.dd = (...args) => {
    for (let arg of args) {
        console.log(`\{${typeof arg}\} ${util.inspect(arg)}`);
    }

    throw new Error(`Stopped with dd. ${typeof args} ${util.inspect(args)}`);
};

/**
 * Compact dates.
 *
 * @param {Array} args
 * @return {{}}
 */
exports.compact = (...args) => {
    let temp = {};

    for (let i = 0; i < args.length; i++) {
        temp[args[i][0]] = args[i][1];
    }

    return temp;
};

/**
 * Clone object.
 *
 * @param object
 */
exports.clone = object => {
    let clone = JSON.parse(JSON.stringify(object));

    return clone;
};

/**
 * Converts json to object and back. If object is a class type,
 * will remove all proprietes, functions, instances from this.
 *
 * @param object
 */
exports.simplify = object => {
    let simplified = JSON.parse(JSON.stringify(object));

    return simplified;
};

/**
 * Returns count of object elements.
 *
 * @param object
 * @return {*}
 */
exports.count = object => {
    if (typeof object == OBJECT) {
        return Object.keys(object).length;
    }

    return 0;
};

/**
 * Delete element from object
 *
 * @param object
 * @param key
 */
exports.unset = (object, key) => {
    delete object[key];
};

/**
 * Call user function.
 *
 * @param {Function} func
 * @param args
 * @return {*}
 */
exports.call_user_func = (func, ...args) => {

    return func(args);
};

/**
 * Multiple require from diffrent paths.
 *
 * @param {Array|String} path
 * @return {*}
 */
exports.require = (path) => {
    // switch (typeof path) 
    // {
    //     case STRING :
    //         return require(path);
    //         break;
    //     case OBJECT :
    // }
};

/**
 * Sprintf string.
 *
 * @return {*}
 */
exports.sprintf = (...args) => {
    var regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = args, i = 0, format = a[i++];

    // pad()
    var pad = function (str, len, chr, leftJustify) {
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };

    // justify()
    var justify = function (value, prefix, leftJustify, minWidth, zeroPad) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, ' ', leftJustify);
            } else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };

    // formatBaseX()
    var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };

    // formatString()
    var formatString = function (value, leftJustify, minWidth, precision, zeroPad) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad);
    };

    // finalFormat()
    var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
        if (substring == '%%') return '%';

        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false;
        for (var j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
            case ' ':
                positivePrefix = ' ';
                break;
            case '+':
                positivePrefix = '+';
                break;
            case '-':
                leftJustify = true;
                break;
            case '0':
                zeroPad = true;
                break;
            case '#':
                prefixBaseX = true;
                break;
        }

        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }

        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }

        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }

        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }

        // grab value using valueIndex if required?
        var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

        switch (type) {
            case 's':
                return formatString(String(value), leftJustify, minWidth, precision, zeroPad);
            case 'c':
                return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
            case 'b':
                return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'o':
                return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'x':
                return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'X':
                return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
            case 'u':
                return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'i':
            case 'd': {
                var number = parseInt(+value);
                var prefix = number < 0 ? '-' : positivePrefix;
                value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                return justify(value, prefix, leftJustify, minWidth, zeroPad);
            }
            case 'e':
            case 'E':
            case 'f':
            case 'F':
            case 'g':
            case 'G': {
                var number = +value;
                var prefix = number < 0 ? '-' : positivePrefix;
                var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                value = prefix + Math.abs(number)[method](precision);
                return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
            }
            default:
                return substring;
        }
    };

    return format.replace(regex, doFormat);
};


/**
 * Check if method's exists in this case of instance.
 * behaviour like interfaces.
 * 
 * @param  {Array|String} method
 * @param  {Object} instance
 * @return {null}
 */
exports.__implementMethods = (method, instance) => {
    let check = (instance, method) => 
    {
        if(! instance[method] && typeof instance[method] != 'function')
        {
            throw new Error(`${instance.constructor.name} abstract method "${method}" does not exists.`);
        }
    };

    switch(typeof method)
    {
        case 'string' :
            check(instance, method);
            break;

        case 'object' :
            for(let i = 0; i < method.length; i++)
            {
                check(instance, method[i]);
            }
            break;
    }
};

/**
 * Check if method exists in the instance case.
 * 
 * @param {Object} instance
 * @param {String} method
 * @return {Boolean}
 */
exports.method_exists = (instance, method) => {
    return method in instance && typeof instance[method] == FUNCTION;
};

exports.print = console.log.bind(console, '>');
