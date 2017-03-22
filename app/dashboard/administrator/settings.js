let h = require('./helpers');
let SettingsModel = require(_namespace.app_path() + '/Option');
let Collection = require('../eloquentable/collection');
const KEY_FIELD = 'key_name';
const VALUE_FIELD = 'value';
const GROUP_FIELD = 'group';

/**
 * Singleton settings processor.
 */
class Settings
{
    constructor(options = {})
    {
        this.options = options;
    }

    /**
     * List of options.
     *
     * @param {String|null} group
     * @return {*}
     */
    listOptions(group = null)
    {
        let settings = this.getOptions();

        if(! h.empty(settings))
        {
            if(settings instanceof Collection)
            {
                if(group)
                {
                    settings = settings.where(GROUP_FIELD, group);
                }

                return settings.list(VALUE_FIELD, KEY_FIELD);
            }

            return settings;
        }

        return (new SettingsModel())
            .getPublic();
            // .then(options => {
            //     // if(options){
            //     //     this.options = options;
            //     //
            //     //     return this.listOptions(group);
            //     // }
            //
            //     return null;
            // });
    }

    /**
     * Get option.
     *
     * @param key
     * @param _default
     * @return {*}
     */
    getOption(key, _default = null)
    {
        let settings = this.listOptions();

        if(settings)
        {
            if(h.isset(settings[key]))
            {
                return settings[key];
            }
        }

        return _default;
    }

    /**
     * Get options as model instances.
     *
     * @return {*}
     */
    getOptions()
    {
        return this.options;
    }
}

module.exports = Settings;