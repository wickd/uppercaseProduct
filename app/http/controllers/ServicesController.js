let Controller = require('./Controller');
let ServicesRepository = require(_namespace.app_path() + '/repositories/servicesRepository');

class ServicesController extends Controller
{
    /**
     * ServicesController constroctor
     *
     * @return {ServicesController}
     */
    constructor()
    {
        super();
        this.servicesRepository = (new ServicesRepository());
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
        let slug = req.params.slug;

        let services = yield this.servicesRepository.getPublic();

        if(services)
        {
            let image = '';

            let service = slug ? services.whereRow('slug', slug) : services.first();

            let attachment = yield service.attachments('cover_image');

            if(attachment && attachment.last())
            {
                image = attachment.last().present().renderPath();
            }

            return res.view('services/index', { item : service, image : image });
        }

        return res.view(404);
    }
}

module.exports = ServicesController;