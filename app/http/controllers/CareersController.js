let Controller = require('./Controller');
let CareersRepository = require(_namespace.app_path() + '/repositories/careersRepository');
let PositionsRepository = require(_namespace.app_path() + '/repositories/positionsRepository');
let Upload = require(_namespace.app_path() + '/dashboard/administrator/helpers/upload');


class CareersController extends Controller
{
    /**
     * CareersController constroctor
     *
     * @return {CareersController}
     */
    constructor()
    {
        super();
        this.careersRepository = (new CareersRepository());
        this.positionsRepository = (new PositionsRepository());
    }

    /**
     * Show careers main index page.
     *
     * @return {res} Response
     */
    * index(req, res, next)
    {
        let positions = yield this.positionsRepository.getPublic();

    	return res.view('careers', { positions : positions });
    }

    /**
     * Send career form.
     *
     * @return {res} res Redirect
     */
    * postCareer(req, res, next)
    {
        let career = yield this.careersRepository.create(req.body, req.files);

        return res.redirect('back');
    }
}

module.exports = CareersController;