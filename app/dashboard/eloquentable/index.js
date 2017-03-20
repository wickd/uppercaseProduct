let h = require('../administrator/helpers');
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at';
const PRIMARY_KEY = 'primaryKey';

module.exports = superclass => class extends superclass {

    boot()
    {
        this._constants();

        this.attributes = {};

        // All columns a fillable.
        this.fillable = ['*'];
        this.original = {};
        this.guarded = [];
        this.table = this.getTableNameFromClass();
        this.foreignKey = '';
        this.timestamps = [this.CREATED_AT, this.UPDATED_AT];
        this[this.PRIMARY_KEY] = this.getDefaultPrimaryKey();

        if (super.boot) super.boot();
    }

    /**
     * Get default primary key.
     *
     * @return {string}
     */
    getDefaultPrimaryKey()
    {
        const DEFAULT_PRIMARY_KEY = 'id';

        return DEFAULT_PRIMARY_KEY;
    }

    /**
     * Get the primary key for the model.
     *
     * @return {*}
     */
    getKeyName()
    {
        return (!h.is_undef(this[PRIMARY_KEY])) ? this[PRIMARY_KEY] : this.getDefaultPrimaryKey();
    }

    /**
     * Get foreign key.
     *
     * @return {*}
     */
    getForeignKey()
    {
        if(! h.empty(this.foreignKey))
        {
            return this.foreignKey;
        }

        let foreignKey = '';

        if(this.getTable().slice(-1) == 's')
        {
            foreignKey = `${this.getTable().substring(0, this.getTable().length - 1)}_id`
        } else {
            foreignKey = `${this.getTable()}_id`;
        }

        return foreignKey;
    }

    /**
     * Set the primary key to the model.
     *
     * @param key
     * @return {Repository}
     */
    setKeyName(key)
    {
        this[PRIMARY_KEY] = key;

        return this;
    }

    /**
     * Set attribute to model.
     *
     * @param key
     * @param value
     * @return {Repository}
     */
    setAttribute(key, value)
    {
        let fillable = this.fillable;

        if (h.exists_in_object('*', fillable) || h.exists_in_object(key, fillable)) {
            this.attributes[key] = value;
        }

        return this;
    }

    /**
     * Get attribute.
     *
     * @param attribute
     * @return {*}
     */
    getAttribute(key)
    {
        if (h.is_undef(this.attributes[key])) {
            return null;
        }

        return this.attributes[key];
    }

    /**
     * Get the value of the model's primary key.
     *
     * @return {*}
     */
    getKey()
    {
        return this.getAttribute(this.getKeyName());
    }

    /**
     * Get dirty.
     *
     * @return {{}}
     */
    getDirty()
    {
        let dirty = {};

        h.each(this.attributes, (value, key) => {
            if(! h.object_key_exists(key, this.original))
            {
                dirty[key] = value;
            } else if (value != this.original[key] &&
                                ! this.originalIsNumericallyEquivalent(key)){
                dirty[key] = value;
            }
        });

        return dirty;
    }

    /**
     * Determine if the new and old values for a given key are numerically equivalent.
     *
     * @param {string} key
     * @return Boolean
     */
    originalIsNumericallyEquivalent(key)
    {
        let current = this.attributes[key];

        let original = this.original[key];

        return h.is_number(current)
            && h.is_number(original)
            && h.strcmp(String(current), String(original)) == 0;
    }

    /**
     * Get attributes.
     *
     * @return {*}
     */
    getAttributes()
    {
        return this.attributes;
    }

    /**
     * Set attributes
     *
     * @param attributes
     */
    setAttributes(attributes = {})
    {
        if (!h.is_empty(attributes)) {
            this.attributes = {};
            h.object_walk(attributes, (value, key)=> {
                this.setAttribute(key, value)
            })
        }
    }

    /**
     * Check if model has attribute.
     *
     * @param attribute
     * @return {boolean}
     */
    hasAttribute(attribute)
    {
        return ! h.is_null(this.getAttribute(attribute));
    }

    /**
     * Has timestmaps.
     *
     * @return {boolean}
     */
    hasTimestamps()
    {
        return Boolean(this.timestamps);
    }

    /**
     * Get model table.
     *
     * @return {*}
     */
    getTable()
    {
        return this.table;
    }

    /**
     * Get table name
     *
     * @return {*}
     */
    getTableNameFromClass()
    {
        let classname = h.get_class(this);

        if (classname) {
            return h.to_lower_case(classname) + 's';
        }

        return null;
    }

    /**
     * Fill data to model attributes
     *
     * @param {Object} data
     * @return this;
     */
    fill(data)
    {
        h.each(data, (value, key) => {
            this.setAttribute(key, value);
        });

        return this;
    }

    /**
     * Fill object with dates
     *
     * @param data
     * @return {*}
     */
    score(data)
    {
        return this
            .fill(data)
            .syncOriginal();
    }

    /**
     * Sync the original attributes with the current.
     *
     * @return this
     */
    syncOriginal()
    {
        this.original = h.clone(this.attributes);

        return this;
    }

    /**
     * Check if model exists
     *
     * @return {boolean}
     */
    exists()
    {
        return ! h.is_null(this.getAttribute(this[PRIMARY_KEY]));
    }

    /**
     * Determine if the given attribute may be mass assigned.
     *
     * @param key
     * @return {boolean}
     */
    isFillable(key)
    {
        return (h.in_object(key, this.getFillable()) && ! h.in_object(key, this.getGuarded()));
    }

    /**
     * Get guarded attributes of the model.
     *
     * @return {Array}
     */
    getGuarded()
    {
        return this.guarded;
    }

    /**
     * Get fillable attributes of the model.
     *
     * @return {Array|string[]}
     */
    getFillable()
    {
        return this.fillable;
    }

    /**
     * Record row to moduler.
     *
     * @param row
     * @returns {Repository}
     * @deprecated
     */
    recordRow(row = null)
    {
        if (!h.is_null(row)) {
            h.each(row, (value, attribute) => {
                this.attributes[attribute] = value;

                this.original[attribute] = value;
            });
        }

        this.setKeyName(
            h.isset(this[this.PRIMARY_KEY])
                ? this[this.PRIMARY_KEY]
                : (!h.is_null(row) )
                ? h.object_key_exists('id', row)
                ? 'id'
                : h.first(row)
                : 'id'
        );

        return this;
    }

    /**
     * Make Constants accessible globaly for children classes.
     *
     * @private
     */
    _constants()
    {
        this.CREATED_AT = CREATED_AT;
        this.UPDATED_AT = UPDATED_AT;
        this.PRIMARY_KEY = PRIMARY_KEY;
    }
};