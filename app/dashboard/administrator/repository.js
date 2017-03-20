let Model = require.main.require('./app/dashboard/model');
// let pagination = require('pagination');
let h = require('./helpers');
let c = require('config').get('db');

let Eloquent = require('../eloquentable');
let Queryable = require('../eloquentable/quaryable');
// todo: implement relationships.

class Repository extends Eloquent(Queryable(Model))
{

    /**
     * table name setter
     * @param {string} value
     * @constructor
     */
    set TABLE(value)
    {
        this.table = (c['prefix']?c.prefix:'')+value;
    }

    /**
     * table name getter
     * @returns {string}
     * @constructor
     */
    static get TABLE()
    {
        return new this().getTable();
    }

    /**
     * Repository constructor.
     *
     * @param {*|null} row
     * @return Repository.
     */

    constructor(row = null)
    {
        super();

        if (super.boot) super.boot();

        if(row)
        {
            // todo fix it, row is null forever.
            return this.initialize(row);
        }

    }


    /**
     * Index results.
     *
     * @param perPage
     * @param schedule
     * @returns {*}
     */
    indexResults(start, perPage, schedule = null)
    {
        return this._buildIndexQuery(schedule.getQuery(), start, perPage).get();
    }


    /**
     * Find row by id.
     *
     * @param id
     * @param schedule
     * @returns {*}
     */
    findRowByID(id)
    {
        return this.find(id).first()
    }

    /**
     * Build index query.
     *
     * @param schedule_query
     * @returns {*}
     * @private
     */
    _buildIndexQuery(schedule_query, start, perPage)
    {
        this.query = ! h.isUndef(schedule_query) ? schedule_query : this.select();

        // todo: query first item problem (HIGH)
        // todo: implement filter.
        // this.handleFilter();

        (this.query['start'] && this.query.start(start)); //start MYSQL
        (this.query['offset'] && this.query.offset(start));//offset POSTGRES

        perPage && this.query.limit(perPage);

        return this;
    }

    getParentInstance()
    {
        return Repository;
    }
}

module.exports = Repository;