let app_provider_path = _namespace.app_path() + '/providers/';
let core_provider_path = _namespace.library_path() + '/foundation/providers/';

let AppServiceProvider = require(app_provider_path + 'appServiceProvider');
let SessionServiceProvider = require(app_provider_path + 'sessionServiceProvider');
let ViewComposerServiceProvider = require(app_provider_path + 'viewComposerServiceProvider');
let GeneratorsRejectionTracerServiceProvider = require(app_provider_path + 'generatorsRejectionTracerServiceProvider');
let CompresionBodyParserServiceProvider = require(app_provider_path + 'compresionBodyParserServiceProvider');
let RouteServiceProvider = require(app_provider_path + 'routeServiceProvider');
let TemplateServiceProvider = require(app_provider_path + 'templateServiceProvider');
let ServerServiceProvider = require(app_provider_path + 'serverServiceProvider');
let AbortServiceProvider = require(app_provider_path + 'abortServiceProvider');

module.exports = {

	/*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    */
	name : "Ebs Creative",

	/*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services your application utilizes. Set this in your ".env" file.
    |
    */
	// env : env('APP_ENV', 'production'),
	env : 'develop',

	/*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */
	locale : 'en',

	/*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */
	providers : [
		AppServiceProvider,
        SessionServiceProvider,
        CompresionBodyParserServiceProvider,
        GeneratorsRejectionTracerServiceProvider,
        ViewComposerServiceProvider,
        RouteServiceProvider,
        TemplateServiceProvider,
        ServerServiceProvider,
        AbortServiceProvider
	],

	/*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */
	aliases : {
		//
	}
};