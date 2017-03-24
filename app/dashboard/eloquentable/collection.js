let h = require('../administrator/helpers');
let Paginator = require('./paginator');

class Collection {

    /**
     * Collection constructor.
     *
     * @param object
     * @return {Collection}
     */
    constructor(object = [])
    {
        this.setCollection(object);

        return this;
    }

    /**
     * Set new collection.
     *
     * @param object
     * @return {Collection}
     */
    setCollection(object)
    {
        let indexer = 0;

        h.object_walk(object, element => {
            this[indexer] = element;

            indexer++;
        });

        return this;
    }

    /**
     * Create new collection instance with incoming items.
     *
     * @param object
     * @return {Collection}
     */
    collect(object = [])
    {
        return new Collection(object);
    }

    /**
     * Push element to collection.
     *
     * @param item
     * @return {*}
     */
    push(item)
    {
        let last = h.last(this);

        if(h.is_object(last))
        {
            this[0] = item;
        } else {
            let key = (Number(last) + 1);

            while(h.is_undef(key)) {
                key++;
            }

            this[key] = item;
        }

        return this;
    }

    /**
     * Get the first column with this value.
     *
     * @param column
     * @param value
     * @return {null}
     */
    whereRow(column, value)
    {

        let element;
        let count = this.count();

        for(let i = 0; i < count; i++)
        {
            let elm = this[i];

            if(elm && elm[column] == value)
            {
                element = elm;

                break;
            }
        }

        return element ? element : null;
    }

    /**
     * Get elements with condition.
     * todo: optimize this method. rework with for
     *
     * @param column
     * @param value
     * @return {*}
     */
    where(column, value)
    {
        let temp = [];

        h.object_filter(this, (elm) => {
            if(elm[column] == value)
            {
                temp.push(elm);
            }
        });

        // return (temp.length == 1) ? temp[0] : this.collect(temp);
        return this.collect(temp);
    }

    /**
     * List columns.
     *
     * @param column_1
     * @param column_2
     * @return {{}}
     */
    list(column_1, column_2 = 'id')
    {
        let temp = {};

        h.object_walk(this, elm => {
            temp[elm[column_2]] = elm[column_1];
        });

        return temp;
    }

    /**
     * Get first element from Collection.
     *
     * @return {*|null}
     */
    first()
    {
        return this[0] ? this[0] : null;
    }

    last()
    {
        let count = this.count();

        if(count)
        {
            if(count == 1)
            {
                return this.first();
            }

            return this[count - 1] ? this[count - 1] : null;
        }

        return null;
    }

    /**
     * Check if collection is empty.
     *
     * @return {boolean}
     */
    isEmpty()
    {
        return h.empty(h.simplify(this));
    }

    /**
     * Returns number of elements from collection.
     *
     * @return {Number}
     */
    count()
    {
        let collection = JSON.parse(JSON.stringify(this));

        return h.count(collection) ? h.count(collection) : 0;
    }

    /**
     * Convert collection instance to json object. Loses the Collection instance.
     *
     * @return {*}
     */
    toJson()
    {
        return h.simplify(this);
    }

    /**
     * Convert collection items from object to array.
     *
     * @return {Array}
     */
    toArray()
    {
        let temp = [];
        let count = this.count();

        if(count)
        {
            for(let i = 0; i < count; i++)
            {
                temp.push(this[i]);
            }
        }

        return temp;
    }

    /**
     * Paginate elements.
     *
     * @param currentPage
     * @param perPage
     * @param numberOfPages
     * @returns {Pagination}
     */
    paginate(currentPage = 1, perPage = 15, numberOfPages = 3,count=0)
    {
         return new Paginator(this, perPage, numberOfPages, currentPage,count);
    }

    /**
     * Slice the collection on segment.
     *
     * @param begin
     * @param end
     * @param {Boolean|true} inclusive_end
     * @return {*}
     */
    slice(begin, end, inclusive_end = true)
    {
        let _array = this.toArray();

        return _array.slice(begin, inclusive_end ? ++end : end);
    }

    /**
     * Separate collection to n-number collections.
     *
     * @return {array}
     */
    // separate(n)
    // {
    //     let indexes = this.indexes();

        
    // }

    /**
     * Get array of indexes from current collection.
     *
     * @return {array}
     */
    // indexes()
    // {
    //     let _array = this.toArray();

    //     return Object.keys(_array);
    // }
}

module.exports = Collection;