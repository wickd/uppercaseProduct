let h = require('../helpers');
const GLOBAL = 'global';
const EACH = 'each';
let Action = require('./action');
let ActionUrl = require('./actionUrl');

// todo: add posibility to remove reserved actions..

class ActionFactory {

    /**
     * ActionFactory constructor.
     *
     * @param each
     * @param global
     */
    constructor(each = {}, global = {})
    {
        this._cleanEachActions = null;
        this._cleanGlobalActions = null;
        this.eachActions = null;
        this.globalActions = null;

        this.defaults = {
            global: {
                create: {}
            },
            each: {
                view: {},
                edit: {},
                delete: {}
            }
        };

        this.setEachActions(each);
        
        this.setGlobalActions(global);
    }

    /**
     * Set each actions for schedule.
     *
     * @param actions
     */
    setEachActions(actions)
    {
        let each = h.merge(this.defaults[EACH] ,actions);

        this._cleanEachActions = each;

        each = this._build(each);

        this.eachActions = each;
    }

    /**
     * Set global actions for shedule.
     *
     * @param actions
     */
    setGlobalActions(actions)
    {
        let global = h.merge(this.defaults[GLOBAL], actions);
        
        this._cleanGlobalActions = global;
        
        global = this._build(global);
        
        this.globalActions = global;
    }

    /**
     * Build action's solution.
     *
     * @param actions
     * @param row
     * @returns {{}}
     * @private
     */
    _build(actions, row = null)
    {
        let list = {};

        h.each(actions, (options, action) => {

            if(h.is_object(options))
            {
                let title = (h.isset(options.title) ? options.title : '');
                let disabled = (h.isset(options.disabled) ? options.disabled : false);

                let confirmation = (h.isset(options.confirmation) ? options.confirmation : null);
                let callback = this.prepareCallback(row, options);
                list[action] = new Action(action, title, confirmation, callback, disabled, row);

                if(h.isset(options.styles))
                {
                    list[action].setStyles(options.styles)
                }
;
            } else if (h.inObject(action, h.merge(h.object_keys(this.defaults.each), h.object_keys(this.defaults.global))))
            {
                let confirmation = ('delete' == action ? 'Are you sure?' : null);

                list[action] = new Action(action, '', confirmation, null);
            }
        });

        return list;
    }

    /**
     * Get each actions for schedule.
     *
     * @param row
     * @returns {*}
     */
    getActions(row = null)
    {
        return (! h.is_null(row)) ? this._build(this._cleanEachActions, row) : this.eachActions;
    }

    /**
     * Get Global actions for schedule.
     *
     * @param row
     * @returns {*}
     */
    getGlobalActions(row = null)
    {
        return (! h.is_null(row)) ? this._build(this._cleanGlobalActions, row) : this.globalActions;
    }

    /**
     * Check if callback is callable
     *
     * @param callback
     */
    isActionCallback(callback)
    {
        return h.is_callable(callback);
    }

    /**
     * Prepare urlable callback.
     *
     * @param callback
     * @returns {*[]}
     */
    prepareUrlableCallback(callback)
    {
        if(h.is_string(callback))
        {
            callback = [ callback, null ];
        }

        let url = callback[0];
        callback = callback[1];
        
        return [ callback, url ];
    }

    /**
     * Prepare callback.
     * @param row
     * @param options
     * @returns {*}
     */
    prepareCallback(row, options)
    {
        if(h.isset(options.callback))
        {
            let callback = options.callback;

            if(! h.is_undef(callback))
            {
                return callback;
            }
        }

        if(h.isset(options.url))
        {
            let callback = options.url;

            if(! h.is_undef(callback))
            {
                let preparedCallback = this.prepareUrlableCallback(callback);
                
                callback = preparedCallback[0];
                let url = preparedCallback[1];
                
                callback = new ActionUrl(url, callback, row);
                
                return callback;
            }
        }
    }
}

module.exports = ActionFactory;