let h = require('./helpers');
let ColumnsFactory = require('./columns/factory');
let ActionsFactory = require('./actions/actionFactory');
let squel = require('squel');
let FormBuilder = require('./form/builder');

class Scheduler {
    /**
     * Inject another classes.
     *
     * @private
     */
    __inject() {
        //
    }

    /**
     * Get constants.
     *
     * @return {{VIEW: string, VIEWS: string, COLUMNS: string, ACTIONS: string, VALIDATIONS: string, EDIT_FIELDS: string, RULES: string, MODEL: string}}
     */
    getConstants()
    {
        const VIEW = 'view';
        const VIEWS = 'views';
        const COLUMNS = 'columns';
        const ACTIONS = 'actions';
        const VALIDATIONS = 'validations';
        const EDIT_FIELDS = 'edit_fields';
        const RULES = 'rules';
        const MODEL = 'model';

        return {
            VIEW: VIEW,
            VIEWS: VIEWS,
            COLUMNS: COLUMNS,
            ACTIONS: ACTIONS,
            VALIDATIONS: VALIDATIONS,
            EDIT_FIELDS: EDIT_FIELDS,
            RULES: RULES,
            MODEL: MODEL
        };
    }

    /**
     * Scheduler constructor method.
     *
     * @param moduler
     * @param schematic
     * @return {Scheduler}
     */
    constructor(moduler, schematic = false)
    {
        this.__inject();
        this.constants = this.getConstants();

        this.page = moduler.title;

        // Class attributes..
        this.setSchedule(moduler.schedule);

        this.title =
            (!h.isUndef(this.getSchedule().title) && !h.empty(this.getSchedule().title))
                ? this.getSchedule().title
                : h.uc_first(moduler.title);

        if (!schematic) {
            this.loadColumns();

            this.loadActions();

            this.initQuery();

            this.loadViews();
        }

        return this;
    }

    /**
     * Set source module.
     *
     * @param page_module
     * @return {Scheduler}
     */
    setSchedule(page_module)
    {
        this.schedule = page_module;

        return this;
    }

    /**
     * Load columns
     *
     * @return void
     */
    loadColumns()
    {
        let columns = this.getColumnScheduleList();

        this.column_factory = new ColumnsFactory(columns);
    }

    /**
     * Load actions
     *
     * @return void
     */
    loadActions()
    {
        let actions = this.getActionsScheduleList();

        if(actions)
            this.action_factory = new ActionsFactory(actions.each, actions.global);
    }

    /**
     * Load views.
     *
     */
    loadViews()
    {
        this.defaults_views = {
            index: "views/partials/scaffold/crud/index",
            view: "views/partials/scaffold/crud/show",
            edit: "views/partials/scaffold/crud/edit",
            create: "views/partials/scaffold/crud/edit" // default is the same like edit.
        };

        let _default = this.parseViews(this.defaults_views);

        let temp = {};

        if (h.isset(this.getViewsScheduleList())) {

            let views = this.parseViews(this.getViewsScheduleList());

            h.object_walk(_default, (view, key) => {
                if (!h.isUndef(views[key])) {
                    temp[key] = h.merge_options(_default[key], views[key]);
                } else {
                    temp[key] = _default[key];
                }
            });
        } else {
            temp = _default;
        }

        this.views = temp;
    }

    /**
     * Init edit form builder.
     *
     * @return {FormBuilder|Builder}
     */
    initFormBuilder(item = null)
    {
        this.fieldFactory = new FormBuilder(this.getEditableFields(), item);

        return this.fieldFactory;
    }

    getFields()
    {
        let [fields, all] = this.fieldFactory.resolveFieldFactoryPromises(item);

        return all
            .then(resolved => {

                return this.fieldFactory;
            });
    }

    /**
     * Get columns
     *
     * @return {Factory}
     */
    getColumns(force = false, scaffoldRows)
    {
        let [ rows, all ] = this.column_factory.resolveOutputPromises(scaffoldRows);

        return all
            .then(resolved => {
                let outputs = {};

                h.object_walk(rows, (promises_indexes, row_id) => {
                    h.each(promises_indexes, (column, col_index) =>
                    {
                        if(! h.isset(outputs[column]))
                        {
                            outputs[column] = {};
                        }

                        outputs[column][row_id] = resolved[col_index];
                    });
                });

                return this.column_factory.getColumns(force, scaffoldRows, outputs);
            });
    }

    /**
     * Get for each column actions.
     *
     * @param row
     * @returns {*}
     */
    getEachActions(row = null)
    {
        return this.action_factory.getActions(row);
    }

    /**
     * Get global actions.
     *
     * @param row
     * @returns {*}
     */
    getGlobalActions(row = null)
    {
        return this.action_factory.getGlobalActions(row);
    }

    /**
     * Get schedule columns.
     *
     * @return {*}
     */
    getColumnScheduleList()
    {
        return this.getSchedule()[this.constants.COLUMNS];
    }

    /**
     * Get schedule columns.
     *
     * @return {*}
     */
    getValidationScheduleList()
    {
        return this.getSchedule()[this.constants.VALIDATIONS];
    }

    /**
     * Get schedule update rules.
     *
     * @return {*}
     */
    getRulesScheduleList()
    {
        return this.getSchedule()[this.constants.RULES];
    }

    /**
     * Get schedule edit fields.
     *
     * @return {*}
     */
    getEditableFields()
    {
        return this.getSchedule()[this.constants.EDIT_FIELDS];
    }

    /**
     * set schedule field
     * @param fieldName
     * @param data
     */
    setEditableField(fieldName, data)
    {
        if (h.isset(this.getSchedule()[this.constants.EDIT_FIELDS][fieldName])) {
            let field = this.getSchedule()[this.constants.EDIT_FIELDS][fieldName];
            Object.assign(field, data)
        }
        else{
            console.log(fieldName+' is not available');
        }
    }

    /**
     * Get actions..
     *
     * @returns {*}
     */
    getActionsScheduleList()
    {
        return this.getSchedule()[this.constants.ACTIONS];
    }

    /**
     * Get custom views.
     *
     * @returns {*}
     */
    getViewsScheduleList()
    {
        return this.getSchedule()[this.constants.VIEWS];
    }

    /**
     * Get source module.
     *
     * @return {*}
     */
    getSchedule()
    {
        return this.schedule;
    }

    /**
     * Get title of schedule.
     *
     * @return {string|*}
     */
    getTitle()
    {
        return this.title;
    }

    /**
     * Get crud name.
     *
     * @returns {*}
     */
    getPage()
    {
        return this.page;
    }

    /**
     * Getter for schedule.
     *
     * @param key
     * @returns {*}
     */
    get(key)
    {
        return this.getSchedule()[key];
    }

    /**
     * Get model.
     *
     * @returns {*}
     */
    getModel()
    {
        return this.getSchedule()[this.constants.MODEL];
    }

    /**
     * Get Query.
     *
     * @returns {*}
     */
    getQuery()
    {
        let queryResult = null;

        // return h.isset(this.schedule.query) && !h.empty(this.schedule.query) //test if the query is defined in cruds
        return h.isset(this.schedule.query) //test if the query is defined in cruds
            ? (queryResult = this.schedule.query(this.query)) ? queryResult : this.query
            : this.query;
    }

    /**
     * Initialize query.
     *
     * @returns {Scheduler}
     */
    initQuery()
    {
        let model = new this.schedule.model();

        this.query = model.select().query;

        return this;
    }

    /**
     * Get views.
     *
     * @param action
     * @returns {*}
     */
    getView(action)
    {
        return this.views[action];
    }

    /**
     * Parse views.
     *
     * @param views
     * @returns {{}}
     */
    parseViews(views)
    {
        let temp = {};

        const CONST_VIEW = this.constants.VIEW;

        h.object_walk(views, (value, action) => {
            let _default = this.defaults_views[action];

            if (h.is_string(value)) {
                h.push(temp, h.push({}, value, CONST_VIEW), action);
            } else if (h.is_object(value) || h.is_callable(value)) {
                h.push(temp, h.push({}, (!h.is_undef(value[CONST_VIEW]) ? value[CONST_VIEW] : _default), CONST_VIEW), action);
            }
        });

        return temp;
    }
}

module.exports = Scheduler;