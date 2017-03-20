let BaseRepository = require('./repository');
let Language = require('../translatable/language');
let db = require('../administrator/db');

class LanguageRepository extends BaseRepository {

    /**
     * Get Language Model.
     *
     * @returns Language
     */
    getModel() {
        return new Language();
    }

    /**
     * Get all public active languages.
     *
     * @return {*}
     */
    getPublic()
    {
        return this.getModel()
            .select()
            .where('active', '=', 1)
            .get();
    }
}

module.exports = LanguageRepository;