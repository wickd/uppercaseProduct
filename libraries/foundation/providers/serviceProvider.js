class ServiceProvider {

	/**
	 * ServiceProvider constructor.
	 *
	 * @param Application application
	 * @return this
	 */
	constructor(application)
	{
		// boot and register.
		
		__h.__implementMethods(['register', 'boot'], this);
		
		this.application = application;
	}

	/**
	 * Get application instance.
	 *
	 * @return {Application}
	 */
	app()
	{
		return this.application;
	}
}

module.exports = ServiceProvider;