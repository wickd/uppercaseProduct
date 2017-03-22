// let h = require(_namespace.app_path() + '/dashboard/administrator/helpers');

/**
 * Class loader.
 * 
 * @param {String} Static Class.
 * @return {Static}
 */
module.exports = (Static) =>
{
    if(typeof Static == 'function')
    {
        return new Static();
    } else if (typeof Static == 'string')
    {
        return (new (require(Static)));
    }

    return Static;
};