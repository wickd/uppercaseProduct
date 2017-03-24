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
        let images = {};
        let categories = yield this.categoriesRepository.getPublic();

        if(categories)
        {
            for(let i = 0, _c = categories.count(); i < _c; i++)
            {
                let cover = yield categories[i].attachments('cover_image');

                images[categories[i].getAttribute('id')] = cover ? cover.first().present().renderPath() : '';
            }
        }

    	return res.view('portfolio/index', { categories : categories, images : images });
    }
}

module.exports = PortofolioController;