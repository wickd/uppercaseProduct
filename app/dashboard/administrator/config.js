let h = require('./helpers');
const DELIMITER = '.';

class Config {

    constructor() {
        //
    }

    /**
     * Load config.
     *
     * @param filePath
     * @returns {*}
     */
    loadConfig(filePath) {
        // todo: find elegant way to load configs.
        return require.main.require(`./app/administrator/config/${filePath}.json`);
    }

    /**
     * Get by key.
     *
     * @param key
     * @param default_value
     * @returns {*}
     */
    get(key, default_value = null) {
        try {
            let config_module = {};

            if (!key.indexOf(DELIMITER)) {

                config_module = this.loadConfig(key);

            } else {
                let paths = key.split('.');

                config_module = this.loadConfig(paths[0]);

                for (let i = 1; i < paths.length; i++) {
                    if (!h.is_undef(paths[i])) {
                        config_module = config_module[paths[i]];
                    }
                }
            }

            return config_module;
        }
        catch (e) {
            console.log(`Can't load module on path ${key}`);
            
            console.log(e);
        }

        return default_value;
    }
}

module.exports = new Config();