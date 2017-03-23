let Controller = require('./Controller');
let ContactsRepository = require(_namespace.app_path() + '/repositories/contactsRepository');

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
        this.contactsRepository = (new ContactsRepository());
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

    /**
     * Save contact form.
     *
     * @return {res} Redirect
     */
    * postContact(req, res, next)
    {
        yield this.contactsRepository.create(req.body);
   
        return res.redirect('back');
    }
}

module.exports = PagesController;