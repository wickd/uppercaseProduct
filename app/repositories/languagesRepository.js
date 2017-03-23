let Repository = require('./repository');
let Language = require(_namespace.app_path() + '/Language');
let h = require('../dashboard/administrator/helpers');

class LanguagesRepository extends Repository {

    /**
     * LanguagesRepository constructor
     *
     * @return {LanguagesRepository}
     */
    constructor()
    {
        super();
    }

    /**
     * Get repository main model.
     *
     * @return {Language}
     */
    getModel()
    {
        return new Language();
    }

    /**
     * Get public languages.
     *
     * @return {Collection|null}
     */
    getPublic()
    {
        return this.getModel()
            .getPublic();
    }

    /**
     * Get Language by slug name
     *
     * @param {string} slug
     * @return {Language|null}
     */
    getBySlug(slug)
    {
        return this.getModel()
            .select()
            .where('slug', '=', slug)
            .where('active', '=', 1)
            .first()
    }

    /**
     * Get default language.
     *
     * @return {Language|null}
     */
    getDefaultLanguage()
    {
        return this.getModel()
            .select()
            .first();
    }
}

module.exports = LanguagesRepository;