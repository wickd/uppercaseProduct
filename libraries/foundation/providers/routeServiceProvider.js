let ServiceProvider = require('./serviceProvider');

class RouteServiceProvider extends ServiceProvider
{
    /**
     * RouteServiceProvider constructor
     * 
     * @return RouteServiceProvider
     */
    constructor(app)
    {
        super(app);
    }
}

module.exports = RouteServiceProvider;