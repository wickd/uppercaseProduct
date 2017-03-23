let Controller = require('./Controller');
let ConstructionsRepository = require(_namespace.app_path() + '/repositories/constructionsRepository');
let CategoriesRepository = require(_namespace.app_path() + '/repositories/categoriesRepository');

class ConstructionsController extends Controller
{
    /**
     * ConstructionsController constroctor
     *
     * @return {ConstructionsController}
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
        let category = yield this.categoriesRepository.getBySlug(req.params.slug);

        if(category)
        {
            let constructions = yield this.constructionsRepository.getCategoryConstructions(category.id);

            return res.view('portfolio/list', { 
                category : category, 
                constructions : constructions 
            });
        }

        return res.view(404);
    }

    /**
     * Show website home page.
     *
     * @param {req} req
     * @param {res} res
     * @param {function} next
     * @return {res} Response
     */
    * show(req, res, next)
    {
        let category = yield this.categoriesRepository.getBySlug(req.params.category_slug);
        let construction = yield this.constructionsRepository.getBySlug(req.params.construction_slug);

        if(construction && category)
        {
            return res.view('portfolio/details', { item : construction, category : category });
        }

        return res.view(404);
    }
}

module.exports = ConstructionsController;