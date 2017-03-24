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
        let images = {};

        if(category)
        {
            let constructions = yield this.constructionsRepository.getCategoryConstructions(category.id);

            if(constructions)
            {
                for(let i = 0, _c = constructions.count(); i < _c; i++)
                {
                    let cover = yield constructions[i].attachments('cover_image');

                    images[constructions[i].getAttribute('id')] = cover ? cover.last().present().renderPath() : '';
                }
            }

            return res.view('portfolio/list', { 
                category : category, 
                constructions : constructions,
                images : images
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
        let gallery = [];

        if(construction && category)
        {
            let attachments = yield construction.attachments('gallery');

            if(attachments)
            {
                for(let i = 0, _c = attachments.count(); i < _c; i++)
                {
                    gallery.push(attachments[i].present().renderPath());
                }
            }

            return res.view('portfolio/details', { 
                item : construction,
                category : category,
                gallery : gallery 
            });
        }

        return res.view(404);
    }
}

module.exports = ConstructionsController;