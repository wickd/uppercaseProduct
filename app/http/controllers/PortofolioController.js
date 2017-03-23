let Controller = require('./Controller');
let CategoriesRepository = require(_namespace.app_path() + '/repositories/categoriesRepository');

class PortofolioController extends Controller
{
    /**
     * PortofolioController constroctor
     *
     * @return {PortofolioController}
     */
    constructor()
    {
        super();
        this.categoriesRepository = (new CategoriesRepository());
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
        let categories = yield this.categoriesRepository.getPublic();

    	return res.view('portfolio/index', { categories : categories });
    }
}

module.exports = PortofolioController;