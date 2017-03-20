let h = require('../administrator/helpers');
let Collection = require('../eloquentable/collection');

class Locale {

    /**
     * Locale constructor.
     *
     * @return void.
     */
    constructor(language = null)
    {
        this.language = language;

        this.languages = global.dashboard.get('languages');
    }

    /**
     * Get id of language.
     *
     * @return {Number}
     */
    id()
    {
        return this.getLocaleLanguage().id;
    }

    /**
     * Get ids of public languages.
     *
     * @return {Array}
     */
    ids()
    {
        let locales = this.getPublicLanguages();

        let temp = [];

        h.each(locales, locale => {
            temp.push(locale.id);
        });

        return temp;
    }

    /**
     * Set locale language.
     *
     * @param language
     * @return {Locale}
     */
    setLang(language)
    {
        this.language = language;

        return this;
    }

    /**
     * Get current locale language.
     *
     * @return {*}
     */
    getLocaleLanguage()
    {
        if(this.language) {
            return this.language;
        } else {
            if(this.languages instanceof Collection)
            {
                return this.getDefaultLanguage();
            }

            return null;
        }
    }

    /**
     * Get default language.
     *
     * @return {*}
     */
    getDefaultLanguage()
    {
        let $default = this.languages.whereRow('def', 1);

        return $default ? $default : this.getPublicLanguages().first();
    }

    /**
     * Get public languages.
     *
     * @return {*}
     */
    getPublicLanguages()
    {
        return this.languages;
    }
}

module.exports = Locale;