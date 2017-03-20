'use strict';

function runtimeLoad(moduleRef) {
    return require(moduleRef);
}

// private function
function getCacheCtor(cache) {

    if (!cache) {
        return;
    }

    if (typeof cache === 'function') {
        return cache;
    }

    var cacheCtors = {
        disabled: runtimeLoad('./DisabledCache'),
        memory: runtimeLoad('./MemoryStore'),
        memcache: runtimeLoad('./MemcachedStore'),
        redis: runtimeLoad('./RedisStore')
    };

    if (!(cache in cacheCtors)) {
        throw new Error('Unsupported cache provider: ' + cache);
    }


    return cacheCtors[cache];
}

// * Example of a object with all available options::
// {
//  store: 'redis',
//  connection: {
//    host: 'localhost',
//    port: 6739,
//  },
//  options: {},
//  ttl: 300,
//  tti: 300
// }

function CacheHandler(options) {
    var self = this;

    var options = options.cacheOptions || null;

    if (options) {

        let store = getCacheCtor(options.store);
        return new store(options)
    }
    return {}
}


module.exports = CacheHandler
