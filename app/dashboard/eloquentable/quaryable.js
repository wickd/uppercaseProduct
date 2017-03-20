let h = require('../administrator/helpers');
let f = require('../administrator/helpers/functions');
let db = require('../administrator/db');
let config = require('config');
let dbDriver = config.get('db.driver');
let squel = require('squel').useFlavour(dbDriver);
let Collection = require('./collection');
let moment = require('moment');

/**
 * Queryable Mixin.
 *
 * @param superclass
 */
module.exports = superclass => class extends superclass {

    /**
     * Boot mixins.
     */
    boot() {
        if (super.boot) super.boot();

        // this.query_builder = this.initQueryBuilder();
        // this.query = new QueryBuilder();
        this.query = null;
    }

    /**
     * Get new query builder squel object.
     *
     * @returns {*}
     */
    newQuery(table = null) {
        return squel
            .select()
            .from(table ? table : this.getTable());
    }

    /**
     * Run row query expr.
     *
     * @return {squel}
     */
    rawQuery(){

        this.query = squel.select();

        return this.query;
    }
    /**
     * Add select to query.
     *
     * @param select
     */
    select(select = []) {
        this.query = squel.select();

        //select per column
        if (!h.empty(select)) {
            select.map(field => this.query.field(field));
        }

        this.query.from(this.getTable());

        return this;
    }

    /**
     * Insert table query.
     *
     * @return {*}
     */
    insertScopeQuery() {
        return squel
            .insert()
            .into(this.getTable());
            //.returning('*');
    }

    /**
     * Update scope query.
     *
     * @returns {*}
     */
    updateScopeQuery() {
        return squel
            .update()
            // .returning('*')
            .table(this.getTable());
            // .returning('*');
    }

    /**
     * Delete table query.
     *
     * @return {*}
     */
    deleteScopeQuery() {

        this.query = squel
            .delete()
            .from(this.getTable());
        return this.returning('*')
    }

    /**
     * Squel returning method..
     *
     * @param s
     * @returns {*}
     */
    returning(s)
    {
        if(typeof s.returning === "undefined"){
            return this.query;
        }else{
            return this.query.returning(s);
        }
    }

    /**
     * Where statement
     *
     * @param {string} column
     * @param {String|=, '>', '<'} operator
     * @param {{}} params Query squel settings
     * @param {*} value
     */
    where(column, operator, value, params = {}) {

        let where = `${column} ${operator} '${value}'`;

        if (h.empty(this.query)) {
            this.query = this.select().where(where, null, params);
        } else {
            this.query = this.query.where(where, null, params);
        }

        return this;
    }

    /**
     * Join to the query.
     * @example : 'User.join('contacts', 'id', '=', 'contacts.user_id')'
     * @example : 'User.join('posts', 'id', '=', 'user_id')'
     *
     * @param {string} joinTable
     * @param {string} localeForeign
     * @param {string|'='} operator
     * @param {string|'id'} joinForeign
     * @param {string|function} whereJoin
     * @param {string|'inner'} type
     */
    join(joinTable, localeForeign, operator = '=', joinForeign = 'id', whereJoin = null, type = 'inner') {
        let query = this.query;

        if (!query) {
            query = this.newQuery();
        }

        let mainTable = this.getTable();
        let joinAlias = `${mainTable[0]}${mainTable[0]}_${joinTable[0]}${joinTable[0]}`;

        // let joinStatement =`${mainTable}.${localeForeign} ${operator} ${joinAlias}.${joinForeign}`;
        let joinStatement = squel.expr()
            .and(`${mainTable}.${localeForeign} ${operator} ${joinAlias}.${joinForeign}`);

        if (whereJoin) {
            if (h.is_callable(whereJoin)) {
                let where = whereJoin(joinStatement, joinAlias, mainTable);

                joinStatement = where ? where : joinStatement;
            }
        }

        switch (type) {
            case 'left' :
                query.left_join(joinTable, joinAlias, joinStatement);
                break;
            case 'right' :
                query.right_join(joinTable, joinAlias, joinStatement);
                break;
            case 'outer' :
                query.outer_join(joinTable, joinAlias, joinStatement);
                break;
            default :
                query.join(joinTable, joinAlias, joinStatement);
                break;
        }

        return this;
    }

    /**
     * Left join
     * @example : 'User.join('posts', 'id', '=', 'user_id')'
     *
     * @param {string} joinTable
     * @param {string} localeForeign
     * @param {string|'='} operator
     * @param {string|'id'} joinForeign
     * @param {string|function} whereJoin
     * @return {*}
     */
    leftJoin(joinTable, localeForeign, operator = '=', joinForeign = 'id', whereJoin = null) {
        return this.join(joinTable, localeForeign, operator, joinForeign, whereJoin, 'left');
    }

    /**
     * Right join
     * @example : 'User.join('posts', 'id', '=', 'user_id')'
     *
     * @param {string} joinTable
     * @param {string} localeForeign
     * @param {string|'='} operator
     * @param {string|'id'} joinForeign
     * @param {string|function} whereJoin
     * @return {*}
     */
    rightJoin(joinTable, localeForeign, operator = '=', joinForeign = 'id', whereJoin = null) {
        return this.join(joinTable, localeForeign, operator, joinForeign, whereJoin, 'right');
    }

    /**
     * Outer join
     * @attention: !!! outer join not working at moment !!!
     * @example : 'User.join('posts', 'id', '=', 'user_id')'
     *
     * @param {string} joinTable
     * @param {string} localeForeign
     * @param {string|'='} operator
     * @param {string|'id'} joinForeign
     * @param {string|function} whereJoin
     * @return {*}
     */
    outerJoin(joinTable, localeForeign, operator = '=', joinForeign = 'id', whereJoin = null) {
        return this.join(joinTable, localeForeign, operator, joinForeign, whereJoin, 'outer');
    }

    /**
     * Current state of query to string sql query.
     *
     * @return string
     */
    toSql() {
        h.print(this.query.toString());

        return this;
    }

    /**
     * select limit w offset
     * @param start
     * @param perPage
     */
    limit(start = 0, perPage = 1000) {
        if (h.empty(this.query)) {
            this.query = this.select().limit(perPage).offset(start);
        } else {
            this.query = this.query.limit(perPage).offset(start);
        }

        return this
    }

    /**
     * Take count elements from rows.
     *
     * @param count
     */
    take(count = 1) {
        if (this.query) {
            this.query = this.query.limit(count);
        }

        return this;
    }

    /**
     * Select all.
     *
     * @return {*}
     */
    all() {
        return this.select().get();
    }

    /**
     * Find by column.
     *
     * @param id
     * @return {*}
     */
    find(id, column = 'id') {
        this.query = this.newQuery();

        this.where(column, '=', id);
    
        return this;
    }

    /**
     * Delete's model from db.
     *
     * @param id
     * @return {*}
     */
    delete(id = null, column = 'id') {
        id = !h.is_null(id) ? id : this[column];

        return db.get(
            this.deleteScopeQuery()
                .where(`${column} = ${ id }`)
        );
    }

    /**
     * Create instance.
     *
     * @param attributes
     * @return Repository
     */
    create(attributes) {
        this.query = this.insertScopeQuery();

        h.each(attributes, (value, column) => {
            if (h.exists_in_object(column, this.fillable)) {
                // this.query.set(`'${column}'`, value);
                // this.query.set(`\`${column}\``, value);
                this.query.set(column, value);
            }
        });

        return this.runQuery()
            .then(result => {
                if (!h.is_null(result)) {
                    if (result.insertId) {
                        /** Get created as model. */
                        return this.find(result.insertId)
                            .first();
                    }
                }

                return result;
            });
    }

    /**
     * Get the first record matching the attributes or instantiate it.
     *
     * @param {Object} attributes
     * @param {Object|[]} columns
     * @return this
     */
    firstOrNew(attributes, columns = []) {
        this.query = this.newQuery();

        if (!h.empty(columns)) {
            h.each(columns, column => {
                if (attributes[column]) {
                    this.where(column, '=', attributes[column]);
                }
            });
        }
        else {
            if (!h.empty(attributes)) {
                h.each(attributes, (value, attribute) => {
                    this.where(attribute, '=', value);
                });
            }
        }
        return this.first()
            .then(res => {
                if (h.is_null(res)) {
                    return this.create(attributes);
                }
                return res;
            })
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     *
     * @param attributes
     * @param {Object|[]} columns
     * @return {*}
     */
    updateOrCreate(attributes, columns = []) {
        return this
            .firstOrNew(attributes, columns)
            .then(result => {

                if (result instanceof this.getParentInstance()) {
                    return result
                        .fill(attributes)
                        .save()
                        .then(res => {
                            if (res) {
                                return result;
                            }

                            return res;
                        });
                }

                return result;
            });
    }

    /**
     * static Init ORM model.
     *
     * @param row
     * @return {Proxy}
     */
    initModel(row) {
        let model = this.constructor;

        return new Proxy((new model()).score(row), {
            get: (target, name, value) => {
                if (h.is_undef(target[name])) {
                    if (h.object_key_exists(name, target.attributes) && h.is_string(name) && !h.is_callable(target[name])) {
                        return target.getAttribute(name);
                    } else if (h.is_callable(target[name])) {
                        return target[name];
                    }
                }

                return target[name];
            }
        });
    }

    /**
     * Initialize from dynamic.
     *
     * @param row
     * @return {Repository}
     */
    initialize(row) {
        return new Proxy(this.score(row), {
            get: (target, name, value) => {
                if (h.is_undef(target[name])) {
                    if (h.object_key_exists(name, target.attributes) && h.is_string(name) && !h.is_callable(target[name])) {
                        return target.getAttribute(name);
                    } else if (h.is_callable(target[name])) {
                        return target[name];
                    }
                }

                return target[name];
            }
        });
    }

    /**
     * Query global scope. Add posibility to modify query with some scopes.
     *
     * return this.
     */
    scopes() {
        return this;
    }

    /**
     * Run query.
     *
     * @param {Boolean|false} scope
     * @return {*}
     */
    runQuery(scope = false) {
        if (scope) {
            this.scopes();
        }

        this.toSql();

        return db.get(
            this.query
        ).then(result => {
            return result;
        });
    }

    /**
     * Order query result by param column and order.
     *
     * @param column
     * @param order
     */
    orderBy(column = 'id', order = 'ASC')
    {
        switch (order)
        {
            case 'DESC' :
                this.query = this.query.order(column, false);
                break;
            case 'ASC' :
                this.query = this.query.order(column, true);
                break;
            default :
                this.query = this.query.order(column, true);
                break;
        }

        return this;
    }

    /**
     * Save model attributes to table.
     *
     * @return {Repository}
     */
    save() {
        if (this.getAttribute(this[this.PRIMARY_KEY])) {

            this.query = this.updateScopeQuery();
            this.query.where(`${this[this.PRIMARY_KEY]} = ${this.getAttribute(this[this.PRIMARY_KEY])}`);

        } else {
            this.query = this.insertScopeQuery();
        }

        h.each(this.fillable, (column) => {
            // Skip guarded columns. Stop mass assigment.

            // console.log(`For ${this.getTable()}.${column} is fillable ? ${this.isFillable(column)}`);

            if (column
                && !h.object_key_exists(column, this.guarded)
                // && !h.exists_in_object(column, this.timestamps)
                && !h.is_undef(this.attributes[column])
                && this.isFillable(column)
            ) {
                // this.query.set('`' + column + '`', this.attributes[column]);
                if(h.exists_in_object(column, this.timestamps))
                {
                    this.query.set(column, moment(this.attributes[column]).format());

                } else {
                    this.query.set(column, this.attributes[column]);
                }
            }

        });

        // h.print(this.toSql());
        return this.runQuery();
    }

    /**
     * Get the first row.
     *
     * @returns {*}
     */
    first(scope = true) {
        scope && this.scopes();

        //run something like User.first()
        (!this.query) && (this.query = this.newQuery());

        this.toSql();

        return db.first(
            this.query
        ).then(result => {
            if (!h.is_null(result)) {
                result = this.initModel(result);
            }

            return result;
        });
    }

    /**
     * Get data from table.
     *
     * @param {Boolean} scope
     * @returns {*}
     */
    get(scope = true) {
        if (scope) {
            this.scopes();
        }

        this.toSql();

        return db.get(
            this.query
        ).then(result => {
            if (result) {
                let items = new Collection();

                h.each(result, item => {
                    items.push(this.initModel(item));
                });

                result = items;
            }

            return result;
        });
    }

    /**
     * Retrieve the "count" result of the query.
     *
     * @returns {Number}
     */
    count() {

        !this.query && (this.query = this.newQuery())
        return db
            .options({autoQuoteFieldNames: false})
            .first(this.query.field('COUNT(*)','count'))
            .then(result=>result?result.count:0);
    }
}