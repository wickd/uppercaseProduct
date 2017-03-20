let expressRoute = require('express').Router();
let wrap = require('co').wrap;

class Router {

	constructor()
	{
		this.GET = 'get';
		this.POST = 'post'
		this.express = expressRoute;
	}

	get(url, _functions = [])
	{
		return this.registerRoute(this.GET, url, _functions);
	}

	post(url, _functions = [])
	{
		return this.registerRoute(this.POST, url, _functions);
	}

	registerRoute(method, url, ..._functions)
	{
		// console.log(expressRoute.get());

		console.log(expressRoute);

		if(expressRoute['method'])
		{
			return expressRoute['method'](url, wrap(_functions));	
		}
		
		// todo; error.
		// return null;
	}

	/**
	 * Get express route instance.
	 *
	 * @return {Object}
	 */
	route()
	{
		return this.express;
	}
}

module.exports = new Router;