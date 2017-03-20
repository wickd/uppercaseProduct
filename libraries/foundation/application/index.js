const DIRECTORY_SEPARATOR = '/';
const VERSION = '1.0.0';
let h = require('../../helpers');
let config = require('config');

class Application {

    /**
     * Application constructor.
     *
     * @param page
     * @param {String|null} basePath
     * @param {String|null} expressApplication
     */
    constructor(basePath = null, expressApplication = null)
    {
        this.expressApp = expressApplication;

        this.bindings = {};

        this.resolved = {};

        this.app_config = {};

        this.aliases = {};

        this.instances = {};

        this.loadedProviders = {};

        this.serviceProviders = [];

        this.bootingCallbacks = [];

        this.booted = false;

        this.h = h;

        this.version = VERSION;

        this.config = config;

        if(basePath)
        {
            this.setBasePath(basePath);
        }

        if(this.preload()) this.loading();
        // this.preload();
    }

    /**
     * Get express application module.
     *
     * @return {Object}
     */
    getExpressApplicationInstance()
    {
        return this.expressApp;
    }

    /**
     * Preload some stuff before main loading.
     * future stuff rezerving.
     *
     * @return bool
     */
    preload()
    {
        this.registerAppConfig();

        return true;
    }

    /**
     * Loading application delegater.
     *
     * @return {null}
     */
    loading()
    {
        this.registerServiceProviders();

        this.registerCoreContainerAliases();

        // this.loadHelpers();

        // todo: init session, localization features.
    }

    /**
     * Register a binding with the dashboard application.
     *
     * @param {string|object} abstract
     * @param {function|string|null} concrete
     * @return void.
     */
    bind(abstract, concrete = null, call_func = true)
    {
        if ( typeof concrete === 'function' && call_func ) 
        {
            this.bindings[abstract] = concrete(this);
        } else {
            this.bindings[abstract] = concrete;
        }
    }

    /**
     * Register a shared binding in the container.
     * 
     * @return {null}
     */
    singleton(abstract, concrete = null)
    {
        this.bind(abstract, concrete);
    }

    /**
     * Get app bindings.
     *
     * @param key
     * @return {null}
     */
    get(key) 
    {
        return this.bindings[key] ? this.bindings[key] : null;
    }

    /**
     * Return config module as an application attribute.
     *
     * @return {Object}
     */
    getConfig()
    {
        return this.config = this.config || config;
    }

    /**
     * Register application config module.
     *
     * @return {null}
     */
    registerAppConfig()
    {
        try {
            let config = require(this.config_path() + DIRECTORY_SEPARATOR + 'app');

            this.setAppConfig(config);
        } catch (err) {
            console.log('Load application config failed');
            console.log(err);
        }
    }

    /**
     * Set application config module.
     *
     * @return this
     */
    setAppConfig(config)
    {
        this.app_config = config;

        return this;
    }

    /**
     * Set the base path for the application.
     *
     * @return this
     */
    setBasePath(basePath)
    {
        // beware the whitespaces, can implement rtrim() method.
        this.basePath = basePath;

        this.bindPathsInContainer();

        return this;        
    }

    /**
     * Bind all of the application paths in the container.
     * 
     * Use this method for paste some paths to application.
     * @return {undefined}
     */
    bindPathsInContainer()
    {
        this.bind('path.app', this.app_path());
        this.bind('path.base', this.base_path());
        this.bind('path.middlewares', this.middlewares_path());
        this.bind('path.config', this.config_path());
        this.bind('path.public', this.public_path());
        this.bind('path.library', this.library_path());
    }

    /**
     * Get app config
     *
     * @return {object}
     */
    getAppConfig()
    {
        return this.app_config;
    }

    /**
     * Register service providers
     * 
     * @return {undefined}
     */
    registerServiceProviders()
    {
        let providers = this.getAppConfig().providers;

        let p_lgth = providers.length;

        for(let i = 0; i < p_lgth; i++)
        {
            this.register(providers[i]);
        }
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
     * Get application app path directory.
     *
     * @return {string}
     */
    app_path()
    {
        return this.basePath + DIRECTORY_SEPARATOR + 'app';
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
     * App providers path.
     *
     * @return {String}
     */
    providers_path()
    {
        return this.app_path() + DIRECTORY_SEPARATOR + 'providers';
    }

    /**
     * Library main providers
     *
     * @return {String}
     */
    core_providers_path()
    {
        return this.library_path() + DIRECTORY_SEPARATOR + 'support/providers';
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
     * Register a service provider with the application.
     *
     * @param {ServiceProvider|String} provider
     * @param {Object} options
     * @param {Boolean} force Force register service provider.
     * @return {ServiceProvider}
     */
    register(provider, options = {}, force = false)
    {
        let registered = this.getProvider(provider);

        if( registered && ! force )
        {
            return registered;
        }

        // If the given "provider" is a string, we will resolve it, passing in the
        // application instance automatically for the developer. This is simply
        // a more convenient way of specifying your service provider classes.
        if( typeof provider == 'string' || typeof provider == 'function' )
        {
            provider = this.resolveProviderClass(provider);
        }

        if( __h ? __h.method_exists(provider, 'register') : (undefined != provider['register']) )
        {
            provider.register();
        }

        // Once we have registered the service we will iterate through the options
        // and set each of them on the application so they will be available on
        // the actual loading of the service objects and for developer usage.
        let options_count = options.length;

        if(options_count)
        {
            let options_keys = Object.keys(options);

            for(let i = 0; i < options_count; i++)
            {
                this[options_keys[i]] = options[i];
            }
        }

        this.markAsRegistered(provider);

        // If the application has already booted, we will call this boot method on
        // the provider class so it has an opportunity to do its boot logic and
        // will be ready for any usage by the developer's application logics.
        if(this.isBooted())
        {
            this.bootProvider(provider);
        }

        return provider;
    }

    /**
     * Get the registered service provider instance if it exists.
     *
     * @param {ServiceProvider|String} provider
     * @return {ServiceProvider|null}
     */
    getProvider(provider)
    {
        let name = typeof provider == 'string' ? new provider() : provider;

        let providers = this.getServiceProviders();

        if(providers.length)
        {
            for(let i = 0; i < providers.length; i++)
            {
                if(providers[i] instanceof name)
                {
                    return providers[i];
                }
            }
        }
    }

    /**
     * Resolve a service provider instance from the class name.
     *
     * @param {string} provider
     * @return {ServiceProvider}
     */
    resolveProviderClass(provider)
    {
        if(__h.is_constructor(provider))
        {
            return new provider(this);
        }
            try
        {
            return this._serializeModule(provider);
        } catch (err) {
            console.log(`Unable to load provider ${provider}. Provider must pe a static class or correct path to class.`);
            console.log(err);
        }
    }

    /**
     * Serialize module to an class instance.
     *
     * @param {String} modulePath
     * @retrun {Object}
     */
    _serializeModule(modulePath)
    {
        return new (this._normalize(modulePath))(this);
    }

    /**
     * Normalize the given class name by removing leading slashes.
     *
     * @param {String} modulePath
     * @return {Object}
     */
    _normalize(modulePath)
    {
        return typeof modulePath == __h.STRING ? require(modulePath) : modulePath;
    }

    /**
     * Mark the given provider as registered.
     *
     * @return {undefined}
     */
    markAsRegistered(provider)
    {
        this.serviceProviders.push(provider);

        this.loadedProviders[provider.constructor.name || (new provider()).constructor.name] = true;
    }

    /**
     * Get loaded service providers.
     *
     * @return {Object}
     */
    getServiceProviders()
    {
        return this.serviceProviders;
    }

    /**
     * Check if application is booted.
     *
     * @return {Boolean}
     */
    isBooted()
    {
        return !!this.booted;
    }

    /**
     * Boot the given service provider.
     * 
     * @param {ServiceProvider} provider
     * @return {*}
     */
    bootProvider(provider)
    {
        if(__h.method_exists(provider, 'boot'))
        {
            return provider['boot'](this.getServiceProviderBootParameters());
        }
    }

    /**
     * Get parameters for provider's boot method
     *
     * @return {Array}
     */
    getServiceProviderBootParameters()
    {
        return [];
    }

    /**
     * Register the core class aliases in the container.
     *
     * @return {undefined}
     */
    registerCoreContainerAliases()
    {
        let aliases = {
            app : [this.library_path() + '/foundation/application']
            // other aliases...
        };

        let aliases_keys = Object.keys(aliases);

        for(let i = 0; i < aliases.length; i++)
        {
            for(let k = 0; k < aliases[i].length; k++)
            {
                this.alias(aliases_keys[i], aliases[i][k]);
            }
        }
    }

    /**
     * Alias a type to a different name.
     *
     * @param {String} abstract
     * @param {Object} alias
     * 
     */
    alias(abstract, alias)
    {
        this.aliases[alias] = this._normalize(abstract);
    }

    /**
     * Get aliases.
     *
     * @return {Object}
     */
    getAliases()
    {
        return this.aliases;
    }

    /**
     * Check if name is registered as alias.
     *
     * @param {String} name
     * @return {Boolean}
     */
    isAlias(name)
    {
        return name in this.getAliases();
    }

    /**
     * Get the alias for an abstract if available.
     *
     * @param {string} abstract
     * @return string
     *
     * @throws {\ExceptionError} If ["abstract" is aliased to itself]
     */
    getAlias(abstract)
    {
        let aliases = this.getAliases();

        if(! aliases[abstract])
        {
            return abstract;
        }

        if(aliases[abstract] == abstract)
        {
            throw new Error(`[${abstract}] is aliased to itself`);
        }

        return this.getAlias(aliased[abstract]);
    }

    /**
     * Get booting callbacks.
     *
     * @return {Object}
     */
    getBootingCallbacks()
    {
        return this.bootingCallbacks;
    }

    /**
     * Boot the application's service providers.
     *
     * return {undefined}
     */
    boot()
    {
        if(this.isBooted())
        {
            return;
        }

        // Once the application has booted we will also fire some "booted" callbacks
        // for any listeners that need to do work after this initial booting gets
        // finished. This is useful when ordering the boot-up processes we run.

        this.fireAppCallbacks(this.getBootingCallbacks());

        let serviceProviders = this.getServiceProviders();

        for(let i = 0; i < serviceProviders.length; i++)
        {
            this.bootProvider(serviceProviders[i]);
        }

        this.booted = true;

        this.fireAppCallbacks(this.getBootingCallbacks());
    }

    /**
     * Add boot listener
     *
     * @param {function} callback
     * @return {undefined}
     */
    addBootingListner(callback)
    {
        this.getBootingCallbacks().push(callback);
    }

    /**
     * Register a new boot boot listener
     *
     * @param {function} callback
     * @return {undefined}
     */
    booting(callback)
    {
        this.addBootingListner(callback);
    }

    /**
     * Register a new "booted" listener.
     *
     * @param {function} callback
     * @return {udnefined}
     */
    booted(callback)
    {
        this.addBootingListner(callback);

        if(this.isBooted())
        {
            this.fireAppCallbacks([callback]);
        }
    }

    /**
     * Call the booting callbacks for the application.
     *
     * @param {Array} callbacks
     * @return {undefined}
     */
    fireAppCallbacks(callbacks)
    {
        for(let i = 0; i < callbacks.length; i++)
        {
            // execute ..
            callbacks[i](this);
        }
    }

    /**
     * Get the service providers that have been loaded.
     *
     * @return {Object}
     */
    getLoadedProviders()
    {
        return this.loadedProviders;
    }

    /**
     * Flush the container of all bindings and resolved instances.
     *
     * @return {undefined}
     */
    flush()
    {
        this.aliases = {};
        this.resolved = {};
        this.bindings = {};
        this.instances = {};
        this.loadedProviders = {};
    }

    /**
     * Get application's name.
     *
     * @return {string}
     */
    getName()
    {
        return this.getAppConfig()['name'];
    }
}

module.exports = Application;