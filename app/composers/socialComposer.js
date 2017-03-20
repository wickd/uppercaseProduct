let Composer = require('./composer');
let SocialsRepository = require('../repositories/socialsRepository');

class SocialsComposer extends Composer
{
    /**
     * SocialsComposer constructor
     * 
     * @return SocialsComposer
     */
    constructor()
    {
    	this.socialsRepository = (new SocialsRepository());
    }

    /**
     * Bind data to the view.
     *
     * @param {Object} view
     * @return void
     */
    compose(view)
    {
    	view.socials = yield this.getSocialsRepository().getPublic();
    }

    /**
     * Get socials repository.
     *
     * @return {SocalsRepository}
     */
    getSocialsRepository()
    {
    	return this.socialsRepository;
    }
}

module.exports = Composer;