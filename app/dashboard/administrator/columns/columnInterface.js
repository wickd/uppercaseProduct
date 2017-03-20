/**
 * class
 */
class ColumnInterface
{
    /**
     * constructor
     */
    constructor()
    {
        let scaffoldRow = {};

        this.getName();
        this.getTitle();
        this.getValue(scaffoldRow);
        this.getFormatted(scaffoldRow);
    }
}

module.exports = ColumnInterface;