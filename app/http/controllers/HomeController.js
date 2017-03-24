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
        let images = {};

        if(constructions)
        {
            for(let i = 0, _count_const = constructions.count(); i < _count_const; i++)
            {
                let [_category, imgs] = yield [
                    this.categoriesRepository.getById(constructions[i].category_id),
                    constructions[i].attachments('cover_image')
                ];

                const_categories[constructions[i].getAttribute('id')] = _category;
                images[constructions[i].getAttribute('id')] = imgs ? imgs.first().present().renderPath() : '';

                // console.log(yield constructions[i].attachments('gallery'));
            }
        }

    	return res.view('home', { 
            constructions : constructions, 
            categories : const_categories,
            images : images
        });
    }
}

module.exports = HomeController;