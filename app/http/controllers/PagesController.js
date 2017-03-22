let Controller = require('./Controller');

class PagesController extends Controller
{
    /**
     * HomeController constroctor
     *
     * @return {HomeController}
     */
    constructor()
    {
        super();
    }

    /**
     * Show about static page.
     *
     * @return {res} Response
     */
    * about(req, res, next)
    {
    	return res.view('about');
    }
}

module.exports = PagesController;