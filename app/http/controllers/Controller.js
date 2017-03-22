class Controller
{
    /**
     * Controller constroctor
     *
     * @return {Controller}
     */
    constructor()
    {
        this.action = '';
    }

    /**
     * Show the index page of controller.
     *
     * @return {res} Response
     */
    index(req, res, next)
    {
    	return res.send(`Index of ${this.constructor.name}`);
    }

    /**
     * Set controller current action name.
     *
     * @return {this}
     */
    setAction(action)
    {
        this.action = action;
    
        return this.action;
    }

    /**
     * Get controller current action name.
     *
     * @return {string}
     */
    getAction()
    {
        return this.action;
    }

    /**
     * Handle some controller data.
     *
     * @param {this} controller
     * @param {string} action
     * @return {this}
     */
    _handleController(controller, action)
    {
        this.setAction(action);

        return this;
    }
}

module.exports = Controller;