let Controller = require('./Controller');

class CareersController extends Controller
{
    /**
     * CareersController constroctor
     *
     * @return {CareersController}
     */
    constructor()
    {
        super();
    }

    /**
     * Show careers main index page.
     *
     * @return {res} Response
     */
    index(req, res, next)
    {
    	return res.view('careers');
    }
}

module.exports = CareersController;