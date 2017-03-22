let Collection = require('../dashboard/eloquentable/collection');
let Option = require(_namespace.app_path() + '/Option');
let h = require('../dashboard/administrator/helpers');
let Service = require('./service');

class SettingsService extends Service
{
    /**
     * SettingsService constructor
     * 
     * @type {Object}
     * @return SettingsService
     */
    constructor(options = {})
    {
        super();
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
                    settings = settings.where('group', group);
                }

                return settings.list('value', 'key_name');
            }

            return settings;
        }

        return (new Option())
            .getPublic();
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

module.exports = SettingsService;