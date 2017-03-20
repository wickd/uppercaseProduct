let Element = require('./element');
let h = require('../helpers');
let f = require('../helpers/functions');
let _ = require('lodash');

class TranslatableElement extends Element {

    /**
     * TranslatableElement constructor.
     *
     * @param element
     */
    constructor(element)
    {
        super(element.getName());
        let app = global.dashboard;

        this.element = element;
        this.current_locale = app.get('locale').id();
        this.translatedTypes = [ 'text', 'textarea', 'markdown' ];
        this.templates = {
            switcher: 'form/type/templates/translatable/switcher.pug',
            index: 'form/type/templates/translatable/translatable.pug',
            switch_btn: 'form/type/templates/translatable/switch_btn.pug'
        };
    }

    /**
     * Get element label.
     *
     * @return {*}
     */
    getLabel()
    {
        return this.element.getLabel();
    }

    /**
     * Get element name
     *
     * @return {*|string|70|string|*|null}
     */
    getName()
    {
        return this.element.getName();
    }

    /**
     * Get element description
     *
     * @return {*}
     */
    getDescription()
    {
        return this.element.getDescription();
    }

    /**
     * Get element type.
     *
     * @return {*}
     */
    getType()
    {
        return this.element.getType();
    }

    /**
     * Get element repository.
     *
     * @return {*|Repository|null}
     */
    getRepository()
    {
        return this.element.getRepository();
    }

    /**
     * Types that can be translated.
     *
     * @param element
     * @return {boolean}
     */
    checkForTranslatableType(element)
    {
        let check = (! h.in_object(element.getType(), this.translatedTypes));

        if(check)
        {
            console.log(`Unfortunately field of type [${element.getType()}] can not be translated`);
        }

        return check;
    }

    /**
     * Render input.
     *
     * @return {*|String|string}
     */
    renderInput()
    {
        return this.element.renderInput();
    }

    /**
     * Element html content
     *
     * @return {String}
     */
    html()
    {
        let app = global.dashboard;
        let inputs = [];
        let name = this.getName();
        let repository = this.getRepository();
        let publicLocales = app.get('locale').getPublicLanguages();

        h.each(publicLocales, locale => {
            let element = _.clone(this.element);

            if(repository.hasTranslation(locale.id))
            {
                element.setValue(repository.translate(locale.id)[name]);
            }

            element.setName(`${locale.id}[${name}]`);
            // element.setName(`${name}[${locale.id}]`);

            let input = element.html();

            inputs.push(
                `<div class="translatable ${locale.id == this.current_locale ? '' : 'hidden'}" data-locale="${locale.id}">${input}</div>`
            );
        });

        return f.view(this.templates['index'], { inputs: inputs.join(""), element: this });
    }

    /**
     * Get switch button.
     *
     * @param language
     * @return {String}
     */
    getSwitchBtn(language)
    {
        return f.view(this.templates['switch_btn'], { language: language, current_locale: this.current_locale, element: this })
    }

    /**
     * Element locale switcher tool.
     *
     * @return {String}
     */
    localeSwitcher()
    {
        let buttons = [];

        let languages = global.dashboard.get('languages');

        h.each(languages, language => {
            buttons.push(this.getSwitchBtn(language));
        });

        return f.view(this.templates['switcher'], { buttons: buttons.join("") });
    }
}

module.exports = TranslatableElement;

