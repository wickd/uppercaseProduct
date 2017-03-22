let h = require(_namespace.app_path() + '/dashboard/administrator/helpers');
let classLoader = require('./classLoader');
let wrap = require('co').wrap;

/**
 * Controller laoder.
 * 
 * @param {String} controller
 * @return {Controller}
 */
module.exports = (controllerMethod) =>
{
	let [ controller, action ] = h.explode('@', controllerMethod);	

	try
	{
		let _controller = classLoader(_namespace.controllers_path() + `/${controller}`);

		if(_controller[action])
		{
			// init controller data.
			_controller._handleController(_controller, action);

			// wrap and save context of controller in action.
			return wrap((req, res, next) => _controller[action](req, res, next));
		}

		throw new Error(`Undefined method ${action} in ${controller}.js`);
	} catch (e) {
		console.log(`Can\'t load controller ${controller}`);
	}
};