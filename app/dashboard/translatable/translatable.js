let co = require('co');
let b = require('bluebird');
let squel = require('squel');
let h = require('../administrator/helpers');
let Repository = require('../administrator/repository');
let Collection = require('../../dashboard/eloquentable/collection');

class Translatable extends Repository {

    /**
     * Translatable constructor.
     *
     * @return void.
     */
    constructor()
    {
        super();
        this.translations = {};
    }

    /**
     * Translate model.
     *
     * @param locale
     */
    translate(locale = null)
    {
        if (! locale)
        {
            let _app = global.app || global.dashboard;

            locale = _app.get('locale').id();
        }

        return this.getTranslation(locale);
    }

    /**
     * Get translated attributes of model.
     *
     * @return {Array}
     */
    getTranslatedAttributes()
    {
        return this.translatedAttributes;
    }

    /**
     * Find by id.
     *
     * @param id
     * @return {*}
     */
    find(id)
    {
        this.query = this.newQuery();

        /** table is under join, so this stuff is hardcoded. rework future */
        this.where(`${this.getTable()}.id`, '=', id);

        return this;
    }

    /**
     * Get translated elements.
     * use strict, if it true, it will select only elements which have any translations,
     * and false select all elements which can dont have a translations
     *
     * @param {Boolean} strict
     */
    translated(strict = false)
    {
        let mainTable = this.getTable();
        let keyName = this.getKeyName();
        let relKeyName = this.getRelationKey();
        let localeKey = this.getLocaleKey();
        let joinTable = this.getTranslationModel().getTable();
        let langId = this.getDefaultLanguageId();
        let alias = "tt";

        this.query
            // .field(`${mainTable}.${keyName} AS ${keyName}`);
            .field(`${mainTable}.${keyName}`, keyName);

        if(this.fillable)
        {
            // todo: Find possibility to get previous selections and use them instead select `*` columns.

            let columns = this.fillable;

            h.each(columns, column => {
                this.query
                // .field(`${mainTable}.\`${column}\` AS \`${column}\``);
                //     .field(`${mainTable}.${column} AS \`${column}\``);
                    .field(`${mainTable}.${column}`, column);
            });
        }

        if(this.hasTranslatedAttributes() && this.getTranslatedAttributes())
        {
            let columns = this.getTranslatedAttributes();

            h.each(columns, column => {
                this.query
                    // .field(`${alias}.\`${column}\``);
                    .field(`${alias}.${column}`);
            });
        }

        // this expression returns null result if the selected does not have any translations.
        // actually this is correct because it trying to get only the translated elements.
        if(strict)
        {
            this.query
                .left_join(`${joinTable}`, `${alias}`, `${mainTable}.${keyName} = ${alias}.${relKeyName}`)
                .where(`${localeKey} = ${Number(langId)}`);
        } else {
            this.query
                .left_join(`${joinTable}`, `${alias}`,
                    squel.expr()
                        // .and(`${mainTable}.\`${keyName}\` = ${alias}.${relKeyName}`)
                        .and(`${mainTable}.${keyName} = ${alias}.${relKeyName}`)
                        .and(`${localeKey} = ${Number(langId)}`)
                );
        }

        // console.log(this.query.toString());
    }

    /**
     * Get all translations models of this model.
     *
     * @param {Boolean} call It true, runs async else just get from attribs.
     * return {Promise|Collection}
     */
    getTranslations(call = false)
    {
        if(call)
        {
            let keyName = this.getKeyName();
            let relKeyName = this.getRelationKey();
            let relationTable = this.getTranslationModel().getTable();
            let tranlsationModel = this.getTranslationModel();

            tranlsationModel.query = tranlsationModel.newQuery(relationTable);

            tranlsationModel.query
                // .where(`${relationTable}.\`${relKeyName}\` = ${this.getAttribute(keyName)}`);
                .where(`${relKeyName} = ${this.getAttribute(keyName)}`);

            return tranlsationModel;
        } else {
            return this.translations;
        }
    }

    /**
     * Get translation.
     *
     * @param locale
     */
    getTranslation(locale = null)
    {
        locale = locale ? locale : global.dashboard.get('locale').id();

        let translation = this.getTranslationByLocaleKey(locale);

        if(translation)
        {
            return translation;
        }

        return null;
    }

    /**
     * Check if model has translated attributes.
     *
     * @return {Boolean}
     */
    hasTranslatedAttributes()
    {
        return h.property_exists('translatedAttributes', this);
    }

    /**
     * Query global scope before execute sql.
     *
     * @return {Translatable}
     */
    scopes()
    {
        this.translated();

        return this;
    }

    /**
     * Get relation key.
     *
     * @return {string|string|string}
     */
    getRelationKey()
    {
        return this.translationForeignKey ? this.translationForeignKey : this.getForeignKey();
    }

    /**
     * Get locale key.
     *
     * @return {string}
     */
    getLocaleKey()
    {
        return (this.localeKey ? this.localeKey : 'language_id');
    }

    /**
     * Get default language id.
     *
     * @return {*}
     */
    getDefaultLanguageId()
    {
        let _app = global.app || global.dashboard;

        if(_app.get('locale'))
        {
            return _app.get('locale').id();
        }
    }

    /**
     * Get translation model.
     *
     * @return {*}
     */
    getTranslationModel(row = null)
    {
        return new (this.translationModel)(row);
    }

    /**
     * Check if model has translations
     *
     * @param locale
     * @return {boolean}
     */
    hasTranslation(locale = null)
    {
        let _app = global.app || global.dashboard;
        let $locale = locale ? locale : _app.get('locale').id();
        let result = false;

        h.each(this.getTranslations(), translation => {
            if(translation.getAttribute(this.getLocaleKey()) == $locale)
            {
                return result = true;
            }
        });

        return result;
    }

    /**
     * Get translation by locale key.
     *
     * @param key
     * @return {{}}
     */
    getTranslationByLocaleKey(key)
    {
        let translated = {};

        h.each(this.translations, translation => {
            if(translation.getAttribute(this.getLocaleKey()) == key)
            {
                translated = translation;
            }
        });

        return translated;
    }

    /**
     * Check if translation is dirty(with changed f)
     *
     * @param translation
     * @return {boolean}
     */
    isTranslationDirty(translation)
    {
        if(translation instanceof Repository)
        {
            let dirtyAttributes = translation.getDirty();

            h.unset(dirtyAttributes, this.getLocaleKey());

            return h.count(dirtyAttributes) > 0;

        } else {
            console.log(`'translation' is not instance of Repository`);
        }
    }

    /**
     * Check if key is a valid locale
     *
     * @param key
     * @return {boolean}
     */
    isKeyALocale(key)
    {
        let locales = this.getLocales();

        return h.in_object(key, locales);
    }

    /**
     * Get list of all available locales
     *
     * @return {*}
     */
    getLocales()
    {
        let _app = global.app || global.dashboard;

        let locales = _app.get('locale').ids();

        if(h.empty(locales))
        {
            console.log('Public languages a empty.');
        }

        return locales;
    }

    /**
     * Get translation or new.
     *
     * @param locale
     * @return {*}
     */
    getTranslationOrNew(locale)
    {
        let translation = this.getTranslation(locale);

        if(translation)
        {
            return this.createNewTranslation(locale);
        }

        return translation;
    }

    /**
     * Create new translation.
     *
     * @param locale
     * @return {*}
     */
    createNewTranslation(locale)
    {
        let translation = this.getTranslationModel();

        translation.setAttribute(this.getLocaleKey(), locale);

        this.translations.add(translation);

        return translation;
    }

    /**
     * @alias getTranslationOrNew
     */
    translateOrNew(locale)
    {
        return this.getTranslationOrNew(locale);
    }

    /**
     * Async save translations and apply callback for every save result.
     *
     * @param {Function|null} callback
     */
    saveTranslations()
    {
        let promises = [];

        h.each(this.translations, (translation, langId) => {
            if(this.isTranslationDirty(translation))
            {
                // on modify translation.
                translation.setAttribute(this.getRelationKey(), this.getKey());

                promises.push(translation.save());
            } else if( ! translation.getAttribute(this.getLocaleKey())
                && ! translation.getAttribute(this.getRelationKey())
            ) {
                // on create translation.
                translation.setAttribute(this.getLocaleKey(), langId);
                translation.setAttribute(this.getRelationKey(), this.getKey());

                promises.push(translation.save());
            }
        });

        return b.all(promises);
    }

    /**
     * Set attribute to model.
     *
     * @param key
     * @param value
     * @return {Repository}
     */
    setAttribute(key, value) {
        let fillable = h.clone(this.fillable);

        if(this.hasTranslatedAttributes() && this.getTranslatedAttributes())
        {
            let translatedAttributes = this.getTranslatedAttributes();

            h.each(translatedAttributes, attribute => {
                if(! h.exists_in_object(attribute, fillable))
                {
                    fillable.push(attribute);
                }
            });
        }

        if (h.exists_in_object('*', fillable) || h.exists_in_object(key, fillable)) {
            this.attributes[key] = value;
        }

        return this;
    }

    /**
     * Override parent fill() method to handle translatable attributes
     *
     * @param attributes
     */
    fill(attributes)
    {
        if(! h.empty(attributes))
        {
            let translations = this.getTranslations();

            if(! (translations instanceof Collection))
            {
                translations = new Collection(translations);
            }

            h.each(attributes, (localeTranlsations, langId) => {
                if(this.isKeyALocale(langId))
                {
                    let translation = translations.whereRow(this.getLocaleKey(), langId);

                    // if(translation instanceof Collection && translation.isEmpty())
                    if(h.is_null(translation))
                    {
                        // fill model with default lang translations as basic attributes
                        if(this.getDefaultLanguageId() == langId)
                        {
                            h.each(localeTranlsations, (value, column) => {
                                this.setAttribute(column, value);
                            });
                        }

                        // for create.
                        return this.translations[langId] = (this.getTranslationModel().initModel(localeTranlsations));
                    } else {
                        // for edit.
                        return translation.fill(localeTranlsations);
                    }

                    // return this.translations[langId] = (this.getTranslationModel().initModel(localeTranlsations));
                }
            });
        }

        return super.fill(attributes);
    }

    /**
     * Override parent save() method to handle translatable attributes.
     *
     * @return Promise
     */
    save()
    {
        return super.save()
            .then(result => {
                if(result && ! this.exists())
                {
                    if(result.insertId)
                    {
                        this.setAttribute(this[this.PRIMARY_KEY], result.insertId);
                    }
                }

                return this.saveTranslations().then(() => result);
            });
    }

    /**
     * Override parent first() method to handle translatable attributes.
     *
     * @param scope
     * @return {*}
     */
    first(scope = true)
    {
        return super.first(scope)
            .then(result => {
                if(result && result instanceof Translatable)
                {
                    return result
                        .getTranslations(true)
                        .get()
                        .then(translations => {
                            result.translations = translations;

                            return result;
                        });
                }
            });
    }

    /**
     * Override parent get() method to handle translatable attributes.
     *
     * @param scope
     * @return {*}
     */
    get(scope = true)
    {
        return super.get(scope)
            .then(result => {
                if(result instanceof Collection)
                {
                    let promises = [];

                    h.each(result, (item, index) => {
                        if(item instanceof Translatable)
                        {
                            promises
                                .push(
                                    item
                                        .getTranslations(true)
                                        .get()
                                );
                        }
                    });

                    return b
                        .all(promises)
                        .then(resolved => {

                            if(resolved)
                            {
                                h.each(resolved, (itemResolve, index) => {
                                    if(result[index])
                                    {
                                        result[index].translations = itemResolve;
                                    }
                                });
                            }

                            return result;
                        })
                }
            });
    }
}

module.exports = Translatable;