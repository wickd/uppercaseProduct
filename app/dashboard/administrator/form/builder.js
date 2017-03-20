let co = require('co');
let b = require('bluebird');
let h = require('../helpers');
let Element = require('./element');
let Flexible = require('./flexible');
let config = require('../config.js');
let Select = require('./type/select');
let Uploadable = require('./uploadable');
let TranslatableElement = require('./translatableElement');

const MODE_EDIT = 'edit';
const MODE_CREATE = 'create';
const EDIT_MODE = 'edit_mode';
const EDITOR_TINYMCE = 'tinymce';
const EDITOR_SUMMERNOTE = 'summernote';

class Builder {
    /**
     * Builder constructor.
     *
     * @param fields
     * @param {*|null} item
     */
    constructor(fields = {}, item = null) {
        this.fields = null;
        this.fieldTypes = config.get('field_types');
        this.resolvedOptions = {};
        this.translatable = {};
        this.item = item;

        this.cleanFields = fields;
    }

    setItem(item) {
        this.item = item;

        return this;
    }

    /**
     * Resolve options promises.
     *
     * @return this
     */
    * resolveOptionsPromises(action) {
        let fields = this.getFields(action);
        let resolved = {};

        if (fields) {
            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];

                if (field.constructor == Select) {
                    if (h.isCallable(field.options)) {
                        let result = yield (field.options)(field.getRepository());

                        resolved[field.getName()] = result;

                        field.options = result;
                    }
                } else if (field instanceof Uploadable && (field.getRepository()['attachments'])) {

                    let attachments = yield field.getRepository().attachments();

                    field.attach(attachments);
                }
            }

            this.resolvedOptions = resolved;
        }

        return this;
    }

    /**
     * Get fields.
     *
     * @param {string|null} action
     * @return {null|*|Array}
     */
    getFields(action = null) {
        if (h.is_null(this.fields)) {
            let fields = [];

            // todo: implement here edit_mode.
            h.object_walk(this.cleanFields, (options, name) => {
                let element = {};

                if (options instanceof Element) {
                    element = options;

                } else if (h.is_string(name) && h.is_object(options)) {
                    let type = options.type;

                    element = this.createElement(type, options, name, this.item);

                    if (h.isset(options.translatable) && Boolean(options.translatable)) {
                        element = new TranslatableElement(element);
                    }
                } else {
                    throw new Error(`Can't initialize element ${name}`);
                }

                if (action && !h.is_undef(options[EDIT_MODE])) {
                    if (action in h.object_flip(options[EDIT_MODE])) {
                        fields.push(element);
                    }
                } else {
                    fields.push(element);
                }
            });

            this.fields = fields;
        }

        return this.fields;
    }

    /**
     * Build element.
     *
     * @param type
     * @param options
     * @param name
     * @param item
     * @return {{}}
     */
    createElement(type, options, name, item) {
        (!h.isset(type) || h.empty(type)) && (type = 'text'); //defaults to text input type if not specified

        let className = this.getFieldTypes()[type];

        if (h.is_undef(className)) {
            // throw new Error(`Unknown file type ${options.type}`);
            console.log(`Unknown file type ${options.type}`);
        }

        let element = {};
        let type_module = require(`${className}`);
        // let type_module = require(`./type/${type}`);

        if (type_module) {
            element = (new type_module(name, h.object_except(options, 'type'), item)).initFromObject(options, item);

            if(element instanceof Flexible)
            {
                let flexible_element = element.resolveElement();

                if(flexible_element)
                {
                    return this.createElement(flexible_element.type, flexible_element, name, item);
                } else {
                    console.log(`Failed to initialize Flex type for input ${name}.`);
                }
            }
        }

        return element;
    }

    /**
     * Get filed types. Loading from field_types.json module.
     *
     * @return {value|*}
     */
    getFieldTypes() {
        return this.fieldTypes;
    }

    /**
     * Validate field type.
     *
     * @param className
     * @return {boolean}
     */
    validateFieldType(className) {
        return Boolean(className instanceof Element);
    }

    /**
     * Field is formated by flex form type.
     *
     * @param field
     * @return {boolean}
     */
    isFlexible(field)
    {
        return this.cleanFields[field.getName()]['type'] == 'flex';
    }

    /**
     * Get editors.
     *
     * @return {Array}
     */
    getEditors() {
        if (!h.is_undef(this.fields)) {
            this.getFields();
        }

        let editors = [];

        h.object_walk(this.fields, field => {
            if (field.getType() == EDITOR_TINYMCE && !h.in_object(EDITOR_TINYMCE, editors)) {
                editors.push(EDITOR_TINYMCE);
            } else if (field.getType() == EDITOR_SUMMERNOTE && !h.in_object(EDITOR_SUMMERNOTE, editors)) {
                editors.push(EDITOR_SUMMERNOTE);
            }

            // init over editors in future.
        });

        return editors;
    }
}

module.exports = Builder;