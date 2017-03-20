let ServiceProvider = require('./serviceProvider');
let bodyParser = require('body-parser');
let compression = require('compression');

class CompressionBodyParserServiceProvider extends ServiceProvider
{
    /**
     * CompressionBodyParserServiceProvider constructor
     * 
     * @return CompressionBodyParserServiceProvider
     */
    constructor(app)
    {
        super(app);
    }

    /**
     * Register the service provider.
     *
     * @return {undefined}
     */
    register()
    {
   		this.app().getExpressApplicationInstance()
   			.use([
   				compression(), 
   				bodyParser.json(), 
   				bodyParser.urlencoded({ extended: true })
			]);
    }

    /**
     * Bootstrap any application services.
     *
     * @return {undefined}
     */
    boot()
    {
        //
    }
}

module.exports = CompressionBodyParserServiceProvider;