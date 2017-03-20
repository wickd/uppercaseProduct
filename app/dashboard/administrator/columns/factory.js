let h = require('../helpers');
let Group = require('./group');
let Column = require('./column');
let b = require('bluebird');

class Factory {

    /**
     * Factory constructor.
     *
     * @param columns Object
     */
    constructor(columns)
    {
        this._cleanColumns = columns;
        this.columns = {};
    }

    /**
     * Get list of columns.
     *
     * @param force
     * @param scaffoldRows
     * @param outputs
     * @return {null|*}
     */
    getColumns(force = false, scaffoldRows, outputs)
    {
        let deferred = b.defer();

        if(!h.empty(scaffoldRows))
        {
            if(h.empty(this.columns) || force)
            {
                h.each(scaffoldRows, row => {

                    this.columns = this._walk(outputs);
                });
            }
        }
        else{
            this.columns = this._walk(outputs);
        }

        deferred.resolve(this.columns);

        return deferred.promise;
    }

    _walk(outputs){
        return h.object_walk(this._cleanColumns, (options, column) => {
            // @todo: implement "visibility" concept

            if(this.isGroup(options)){
                let title = (h.isset(options.title))
                    ? options.title
                    : column;
                let sortField = (h.isset(options.sort_field))
                    ? options.sort_field
                    : null;

                var item = new Group(column, title, options.elements, sortField);
            } else {

                var item = new Column(column, options);

                if(h.isset(outputs[column]))
                {
                    item.setOutputPromiseResult(outputs[column]);
                }
            }

            return item;
        });
    }

    /**
     * Check if column is column group.
     *
     * @param options
     * @return {boolean}
     */
    isGroup(options)
    {
        return h.isObject(options) && h.object_key_exists("elements", options);
    }

    /**
     * Resolve outputs promises.
     *
     * @param scaffoldRows
     * @return {*[]}
     */
    resolveOutputPromises(scaffoldRows)
    {

        let temp = [];
        let columns = [];
        let rows = [];

        h.each(scaffoldRows, row => {
            h.each(this._cleanColumns, (options, column) => {
                if(! this.isGroup(options))
                {
                    if(h.isset(options.output))
                    {
                        if(! h.isset(rows[row.id]))
                        {
                            rows[row.id] = {};
                        }

                        // todo: stuff is hardcoded. find better way.
                        rows[row.id][(columns.push(column) - 1)] = column;

                        let output = options.output;

                        temp.push(output(row));
                    }
                }
            });
        });

        return [ rows, b.all(temp) ];
    }
}

module.exports = Factory;