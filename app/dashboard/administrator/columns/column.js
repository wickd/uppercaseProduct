let ColumnAbstract = require('./columnAbstract');
let ColumnInterface = require('./columnInterface');
let Callable = require('../callable');
let h = require('../helpers');

class Column extends Callable(ColumnAbstract) {

    // __implements()
    // {
    //     this.interface.columnInterface = ColumnInterface;
    // }

    /**
     * Column constructor.
     *
     * @param column
     * @param {{}|null} options
     * @param {Boolean} standalone
     */
    constructor(column, options = null, standalone = false) {
        let name, title, sortable, output;

        super();

        if (h.isNumber(column) && h.isString(options)) {
            name = options;
            title = name;
            sortable = true;
            standalone = false;
            output = null;
            // column set using simple style: 'username'
        } else if (h.isString(column) && h.isObject(options)) {
            name = column;
            title = h.isset(options.title) ? options.title : "";
            sortable = h.isset(options.sortable) ? options.sortable : true;
            standalone = h.isset(options.standalone) ? options.standalone : false;
            output = h.isset(options.output) ? options.output : false;
        } else {
            throw new Error(`Invalid column format: ${column} ${options}`);
        }

        this.name = name;

        this.isGroup = false;

        if (h.empty(title)) {
            title = name;
        }

        this.title = h.uc_first(h.explode("_", title).join(" "));

        this.sortable = Boolean(sortable);
        this.standalone = Boolean(standalone);
        this.outputCallback = output;

        /** Run Callable trait. **/
        if (super.boot) super.boot();
    }

    /**
     * Get value.
     *
     * @param {Object} scaffoldRow
     * @return {*}
     */
    getValue(scaffoldRow) {
        return scaffoldRow[this.getName()];
    }

    /**
     * Get formatted column.
     *
     * @param scaffoldRow
     * @return {*}
     */
    getFormatted(scaffoldRow) {
        if (!this.outputCallback) {
            return this.getValue(scaffoldRow);
        }

        if (h.isCallable(this.outputCallback) || h.isPromise(this.outputCallback))
        {
            return this.getRowOutputPromiseResult(scaffoldRow);
        }

        return this.outputCallback
            .replace(/\(\:([a-z0-9\_]+)\)/gi, (matches, field) => {
                return scaffoldRow[field];
            });
    }

    /**
     * Check if column is standalone.
     *
     * @return {boolean|*}
     */
    isStandalone() {
        return this.standalone;
    }
}

module.exports = Column;