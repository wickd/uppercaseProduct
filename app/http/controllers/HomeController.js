let Controller = require('./Controller');
let ConstructionsRepository = require(_namespace.app_path() + '/repositories/constructionsRepository');
let CategoriesRepository = require(_namespace.app_path() + '/repositories/categoriesRepository');

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
        let constructions = yield this.constructionsRepository.getSliderPublic();
        let const_categories = {};

        if(constructions)
        {
            for(let i = 0, _count_const = constructions.count(); i < _count_const; i++)
            {
                let _category = yield this.categoriesRepository.getById(constructions[i].category_id);

                const_categories[constructions[i].getAttribute('id')] = _category;
            }
        }

    	return res.view('home', { constructions : constructions, categories : const_categories });
    }
}

module.exports = HomeController;