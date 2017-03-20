let ColumnAbstract = require('./columnAbstract');
let Column = require('./column');
let h = require('../helpers');
let ColumnInterface = require('./columnInterface');

class Group extends ColumnAbstract {

    /**
     *
     * @private
     */
    __implements()
    {
        this.interface.columnInterface = ColumnInterface;
    }

    /**
     * Group constructor.
     *
     * @param {string} name
     * @param {string} title
     * @param {Object} elements
     * @param sortField
     */
    constructor(name, title, elements, sortField = null)
    {
        super();
        this.standalone = false;
        this.name = name;
        this.isGroup = true;

        if(h.empty(title))
        {
            title = name;
        }

        this.title = h.uc_first(h.explode("_", title).join(" "));

        this.setElements(elements);

        if (sortField) {
            this.sortable  = true;
            this.sortField = sortField;
        }
    }

    /**
     * Set elements to group
     *
     * @param {Object} elements
     */
    setElements(elements)
    {
        this.elements = {};

        this.elements = h
            .object_walk(elements, (options, column) => {
                return new Column(column, options);
            });

        return this;
    }

    /**
     * Get elements group.
     *
     * @return {{}|*}
     */
    getElements()
    {
        return this.elements;
    }

    /**
     * Get value
     *
     * @param scaffoldRow
     * return {Object}
     */
    getValue(scaffoldRow)
    {
        let temp = {};

        h.each(this.getElements(), (element) => {
            temp[element.getName()] = element.getRow(scaffoldRow);
        });

        return temp;
    }

    /**
     * Get formatted row.
     *
     * @param scaffoldRow
     * @return {Object}
     */
    getFormatted(scaffoldRow)
    {
        let temp = {};

        h.each(this.getElements(), (element) => {
            temp[element.getName()] = element.getFormatted(scaffoldRow);
        });

        return temp;
    }
}

module.exports = Group;