let Controller = require('./Controller');
let ConstructionsRepository = require(_namespace.app_path() + '/repositories/constructionsRepository');

class HomeController extends Controller
{
    /**
     * HomeController constroctor
     *
     * @return {HomeController}
     */
    constructor()
    {
        super();
        this.constructionsRepository = (new ConstructionsRepository());
    }

    /**
     * Show website home page.
     *
     * @param {req} req
     * @param {res} res
     * @param {function} next
     * @return {res} Response
     */
    * index(req, res, next)
    {
        let constructions = yield this.constructionsRepository.getSliderPublic();

    	return res.view('home', { constructions : constructions });
    }
}

module.exports = HomeController;