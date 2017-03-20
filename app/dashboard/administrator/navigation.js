// TODO: !!! parse dirrectories from inbox config, not external.
let directoriesHelper = require.main.require('./helpers/directories');

let b = require('q');
let h = require('./helpers');
let Scheduler = require('./scheduler');
let config = require('./config');

class Navigation
{
    /**
     * Inject other classes.
     *
     * @private
     */
    __inject()
    {
        //
    }

    /**
     * Navigation constructor.
     *
     * @attributes nav_items, current_module
     * @param schedule
     */
    constructor(schedule = null)
    {
        this.current_page = null;
        this.pages = null;
        this.page_modules = null;
        this.linkIcon = 'fa-circle-o';
        this.folderIcon = 'fa-folder';
        this.schedule = schedule;

        this.loadNavigationPages();
    }

    /**
     * Load page modules.
     *
     * @return {deferred.promise|{then}}
     */
    loadPagesSchedules()
    {
        let deferred = b.defer();

        // todo: find better solution to load it ..
        directoriesHelper.getFiles(this.getCrudPath(), true).done(files => {
            let modules = {};

            for(let i in files)
            {
                let filename = files[i].split('.js')[0];

                modules[filename] = this.loadPageModule(filename);
            }

            this.page_modules = modules;

            deferred.resolve(modules);
        });

        return deferred.promise;
    }

    /**
     * Load page module
     *
     * @param page_module
     * @return {deferred.promise|{then}}
     */
    loadPageSchedule(page_module)
    {
        let deferred = b.defer();

        try {
            let schedule = require.main.require(this.getCrudPath() + page_module);

            page_module = new Scheduler(
                {
                    title: page_module,
                    schedule: schedule
                }
            );

            this.setCurrentModulePage(page_module);

            deferred.resolve(page_module);
        }
        catch (e) {
            deferred.reject(e);
        }

        return deferred.promise;
    }

    /**
     * Load navigation menu pages.
     *
     * @return {deferred.promise|{then}}
     */
    loadNavigationPages()
    {
        let deferred = b.defer();

        let pages = this.parsePages(config.get('nav_menu'));

        this.setPages(pages);

        deferred.resolve(pages);

        return deferred.promise;
    }

    /**
     * Parse navigation pages.
     *
     * @param pages
     * @return {*}
     */
    parsePages(pages)
    {
        let temp = {};

        h.each(pages, (options, key) => {
            let isFolder = h.isObject(options) && ('pages' in options);

            if(isFolder)
            {
                let icon = ('icon' in options) ? options.icon : this.folderIcon;
                key = this.titlefy(key);

                let children = {
                    title: h.uc_first(key),
                    icon: icon,
                    pages: this.parsePages(options.pages),
                    isGroup: true
                };

                // skip empty groups
                if (! h.empty(children['pages']))
                {
                    temp[key] = children;
                }
            }
            else
            {
                if(h.isString(key) && h.isString(options))
                {
                    var key   = this.titlefy(! h.is_number(key) ? options : key);
                    var page  = options.toLowerCase();
                    var title = h.uc_first(page);
                    var link  = this.generatePageUrl(page);
                    var icon  = this.linkIcon;
                }
                else if (h.isString(key) && h.isObject(options))
                {
                    var key   = this.titlefy(key);
                    var page  = ('page' in options) ? options.page : key;
                    var title = ('title' in options) ? h.uc_first(options.title): h.uc_first(key);
                    var link  = ('link' in options) ? options.link: this.generatePageUrl(page);
                    var icon  = ('icon' in options) ? options.icon: this.linkIcon;
                }

                temp[key] = { page: page, title: title, link: link, icon: icon, isGroup: false };
            }
        });

        return temp;
    }

    /**
     * Generate page's url.
     *
     * @param page
     * @return {string}
     */
    generatePageUrl(page)
    {
        return `/dashboard/pages/${page}`;
    }

    /**
     * Render page title.
     *
     * @param key
     * @return {*}
     */
    titlefy(key)
    {
        let title = key.toLowerCase().replace('/-/i', '_');

        return title;
    }

    /**
     * Check if page is current page.
     *
     * @param page
     * @return {boolean}
     */
    isActive(page)
    {
        return (page == this.getCurrentPage());
    }

    /**
     * Get crud path directory.
     *
     * @return string
     */
    getCrudPath()
    {
        return config.get('dashboard.crud_path');
    }

    /**
     * Set navigation pages.
     *
     * @param pages
     * @return {Navigation}
     */
    setPages(pages)
    {
        this.pages = pages;

        return this;
    }

    /**
     * Get navigation menu items.
     *
     * @return {*|null}
     */
    getPages()
    {
        return this.pages;
    }

    /**
     * Set current module page.
     *
     * @param page
     */
    setCurrentPage(page)
    {
        this.current_page = page;

        return this;
    }

    /**
     * Get current module page.
     *
     * @return {deferred.promise|{then}}
     */
    getCurrentPage()
    {
        return this.current_page;
    }

    setCurrentModulePage(page_module)
    {
        this.schedule = page_module;

        return this;
    }

    /**
     * Get current schedule.
     *
     * @return {*}
     */
    getSchedule()
    {
        return this.schedule;
    }

    /**
     * Get current module.
     *
     * @param page
     * @return {*}
     */
    getCurrentModule(page = null)
    {
        return this.getSchedule();
    }
}

module.exports = Navigation;