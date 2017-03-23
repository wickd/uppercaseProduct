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

    /**
     * Show services static page.
     *
     * @return {res} Response
     */
    * services(req, res, next)
    {
        return res.view('services/index');
    }

    /**
     * Show contact static page.
     *
     * @return {res} Response
     */
    * contact(req, res, next)
    {
        return res.view('contact');
    }
}

module.exports = PagesController;