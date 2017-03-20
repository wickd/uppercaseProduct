let h = require('../app/dashboard/administrator/helpers');

class View {

	/**
	 * View constructor.
	 *
	 * @return View
	 */
	construct(view, path, data = [])
	{
		this.view = view;	
		this.path = path;
		this.data = data;
	}

	render()
	{
		//
	}

	/**
	 * Get the name of the view.
	 *
	 * @return {string}
	 */
	name()
	{
		return this.getName();
	}

	/**
	 * Get the name of the view.
	 *
	 * @return {string}
	 */
	getName()
	{
		return this.view;
	}

	/**
	 * Get the array of view data.
	 *
	 * @return {object}
	 */
	getData()
	{
		return this.data;
	}

	/**
	 * Get the path to the view file.
	 *
	 * @return {string}
	 */
	getPath()
	{
		return this.path;
	}

	/**
	 * Set the path to the view.
	 *
	 * @param {string} path
	 * @return this
	 */
	setPath(path)
	{
		this.path = path;

		return this;
	}

	/**
	 * Add a piece of data to the view.
	 * 
	 * @param {array|object|string} Key
	 * @param {*|null} value
	 * @return this
	 */
	with(key, value = null)
	{
		if(h.is_object)
		{
			this.data = h.object_merge(this.data, key);
		} else {
			this.data[key] = value;
		}

		return this;
	}

	composer(template)
	{

	}
}

module.exports = View;