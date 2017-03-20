class ColumnAbstract {

    /**
     * ColumnAbstract constructor.
     *
     * @return void
     */
    constructor()
    {
        this.name = null;
        this.title = null;
        this.sortable = false;
    }

    /**
     * Get name.
     *
     * @return {null}
     */
    getName()
    {
        return this.name;
    }

    /**
     * Get title.
     *
     * @return {null}
     */
    getTitle()
    {
        return this.title
    }
}

module.exports = ColumnAbstract;