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
     * Http path.
     *
     * @return {string}
     */
    http_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'app' + DIRECTORY_SEPARATOR + 'http';
    }

    /**
     * Application routes path.
     *
     * @return {string}
     */
    routes_path()
    {
        return this.http_path() + DIRECTORY_SEPARATOR + 'routes';
    }

    /**
     * Get middlewares path directory.
     *
     * @return {string}
     */
    middlewares_path()
    {
        return this.http_path() + DIRECTORY_SEPARATOR + 'middlewares';
    }

    /**
     * Get application controllers path.
     *
     * @return {string}
     */
    controllers_path()
    {
        return this.http_path() + DIRECTORY_SEPARATOR + 'controllers';
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
     * Get application resources path.
     *
     * @return {string}
     */
    resources_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'resources';
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
     * Get application helpers path.
     * @depricated
     *
     * @return {string}
     */
    helpers_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'helpers';
    }

    /**
     * Get main library path
     * @depricated
     *
     * @return {string}
     */
    library_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'libraries';
    }

    /**
     * Get application vendor path.
     *
     * @return {string}
     */
    vendor_path()
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