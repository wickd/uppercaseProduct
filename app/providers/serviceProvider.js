let ServiceProviderBase = require(_namespace.library_path() + '/foundation/providers/serviceProvider');

class ServiceProvider extends ServiceProviderBase {

	/**
	 * ServiceProvider constructor.
	 *
	 * @return this
	 */
	constructor(application)
	{
		super(application);
	}
}

module.exports = ServiceProvider;