const DIRECTORY_SEPARATOR = '/';

class ApplicationPath {

    /**
     * ApplicationPath constructor.
     *
     * @param page
     * @param {String} basePath
     * @return ApplicationPath
     */
    constructor(basePath = null) 
    {
        this.basePath = basePath;
    }

    /**
     * Get application app path directory.
     *
     * @return {string}
     */
    app_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'app';
    }

    /**
     * Get the base path of the root.
     *
     * @return {string}
     */
    base_path()
    {
        return this.basePath;
    }

    /**
     * Alias to base_path method.
     * 
     * @return {string}
     */
    root_path()
    {
        return this.base_path();
    }

    /**
     * Get middlewares path directory.
     *
     * @return {string}
     */
    middlewares_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'middlewares';
    }

    /**
     * Get public path.
     *
     * @return {string}
     */
    public_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'public';
    }

    /**
     * Get config path.
     *
     * @return {string}
     */
    config_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'config';
    }

    /**
     * Get main library path
     *
     * @return {string}
     */
    library_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'libraries';
    }

    /**
     * Alias to library_path()
     * 
     * @return {string}
     */
    core_path()
    {
        return this.library_path();
    }
}

module.exports = ApplicationPath;