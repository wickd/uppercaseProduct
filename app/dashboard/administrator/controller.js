let q = require('q');
let co = require('co');
let c = require('./config');
let h = require('./helpers');
let f = require('./helpers/functions');
// var paginate = require('paginate')();
let bcrypt = require('./helpers/bcrypt');

let Navigation = require('./navigation');
let Map = require('../administrator/form/type/map');
let Key = require('../administrator/form/type/key');
let File = require('../administrator/form/type/file');
let Upload = require('../administrator/helpers/upload');
let Repository = require('../administrator/repository');
let Image = require('../administrator/form/type/image');
let ControllerAbstract = require('./controllerAbstract');
let FormBuilder = require('../administrator/form/builder');
let Uploadable = require('../administrator/form/uploadable');
let Password = require('../administrator/form/type/password');
let Checkboxable = require('../administrator/form/checkboxable');
let TranslatableElement = require('../administrator/form/translatableElement');

const POST = 'POST';

class Controller extends ControllerAbstract
{
    /**
     * Controller injections.
     *
     * @private
     * @return void.
     */
    __inject()
    {
        this.navigation = new Navigation();
    }

    /**
     * Controller constructor.
     *
     * @return void.
     */
    constructor()
    {
        super();

        this.__inject();

        this.initPagination();
    }

    /**
     * Is key field, (readonly).
     *
     * @param field
     * @return {boolean}
     */
    isKeyField(field)
    {
        return field instanceof Key;
    }

    /**
     * Is media files.
     *
     * @param field
     * @param files
     * @param images
     * @return {boolean}
     */
    isMediaField(field) {
        // return h.object_key_exists(field, files) || h.object_key_exists(field, images);
        return field instanceof File || field instanceof Image;
    }

    /**
     * Check if element is translatable.
     *
     * @param field
     * @return {boolean}
     */
    isTranslatableField(field)
    {
        return field instanceof TranslatableElement;
    }

    /**
     * Decouple media from data.
     *
     * @param fields
     * @return {*[]}
     */
    decoupleMediaFromData(fields, Uploaded) {
        let files = []; //, images = [];
        h.each(fields, field => {

            if(field instanceof Uploadable && field.getName())
            {

                let name = field.getName();

                    let fieldUploaded = h.object_filter(Uploaded, (file) => {
                        return name == file.fieldname;
                    });
                    h.each(fieldUploaded, file => {
                        field.setAttachment(file);
                    });

                files.push(field);

            }
        });

        return files;
    }

    /**
     *
     * @param name
     * @param value
     * @returns {string}
     */
    nullifyEmptyValues(name, value = '')
    {
        // if(!value && )
        // console.log(value);

        // todo: add schema for current model.

        return value;
    }

    /**
     * Clean data.
     *
     * @param data
     * @return {*}
     */
    cleanData(data)
    {
        // return h.object_except(data, [
        //     // '_token',
        //     'save',
        //     'Save',
        //     'cancel',
        //     'save_create',
        //     'save_return'
        // ] + h.isset(this.model.getKeyName()) ? this.model.getKeyName() : [] );

        if(h.isset(this.model.getKeyName()))
        {
            return h.object_except(data, 'save', 'Save', 'cancel', 'save_create', 'save_return', this.model.getKeyName());
        }

        return h.object_except(data, 'save', 'Save', 'cancel', 'save_create', 'save_return');
    }

    /**
     * Check if field is Checkboxable.
     *
     * @param field
     * @return {boolean}
     */
    isCheckboxType(field)
    {
        return field instanceof Checkboxable;
    }

    /**
     * Check if field is Map.
     *
     * @param field
     * @return {boolean}
     */
    isMapField(field)
    {
        return field.constructor == Map;
    }

    /**
     * Check if field is a password field.
     *
     * @param field
     * @return {boolean}
     */
    isPasswordType(field)
    {
        return field instanceof Password;
    }

    /**
     *
     * @param name
     * @param checkbox_value
     * @returns {number}
     */
    clearCheckboxField(name, checkbox_value)
    {
        if(h.is_object(checkbox_value))
        {
            // this stuff is hardcoded.
            // todo: find better way ro resolve issue with getting checkbox value.
            return Number(h.isset(checkbox_value[1]) ? checkbox_value[1] : checkbox_value[0]);
        }

        return Number(checkbox_value);
    }

    /**
     *
     * @returns {{save: {value: string, class: string, style: string}, save_return: {value: string, class: string, style: string}, save_new: {value: string, class: string, style: string}}}
     */
    renderEditButtons()
    {
        return {
            save: {
                value: "Save changes",
                class: "btn btn-sm btn-primary",
                style: "margin-right: 5px; margin-left: 5px"
            },
            save_return: {
                value: "Save & Return",
                class: "btn btn-sm btn-success",
                style: "margin-right: 5px"
            },
            save_new: {
                value: "Save & Create New",
                class: "btn btn-sm btn-success",
                style: "margin-right: 5px"
            }
        };
    }

    /**
     * Manage redirect.
     *
     * @param req
     * @param res
     * @param item
     * @return {337}
     */
    manageRedirect(req, res, item = null)
    {
        let input = req.body;

        let app = global.dashboard;

        let queryString = (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '');

        if(input['save'])
        {
            if(item && item.id)
            {
                return res.redirect(`/dashboard/pages/${app.page}/${item.id}/edit` + queryString);
            }

            return res.redirect('back');

        } else if(input['save_return'])
        {
            return res.redirect(`/dashboard/pages/${app.page}` + queryString);

        } else if(input['save_new']) {

            return res.redirect(`/dashboard/pages/${app.page}/create-new`);

        } else {

            return res.redirect(`back`);

        }
    }
}

let controller = new Controller();

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => co(function*() {

    // let dashboard = req.dashboard;
    let dashboard = global.dashboard;
    let action = req.action;
    let currentPage = (! h.empty(req.query) && req.query.page) ? req.query.page : 0;

    let count = yield dashboard.get('schedule_model').count();

    let rows = yield dashboard.get('schedule_model').indexResults(currentPage, controller.perPage, dashboard.get('schedule'));

    let columns = yield dashboard.get('schedule').getColumns(false, rows);

    let $view = dashboard.get('schedule').getView(action);

    let data = h.compact(
        [ 'queryString', (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '') ],
        [ 'items', rows.paginate(currentPage, controller.perPage) ],
        [ 'navigatable', dashboard.get('navigation') ],
        [ 'schedule', dashboard.get('schedule') ],
        [ 'session', dashboard.session ],
        [ 'page', dashboard.page ],
        [ 'columns', columns ],
        [ 'h', h ]
    );


    if(h.isCallable($view.view))
    {
        $view.view(h.compact([ 'req', req ], [ 'res', res ], [ 'next', next ]), action, data);
    } else {

         res.renderModule($view.view, data);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.actions = (req, res, next) => co(function*() {
    let action = req.action;

    if(! h.object_key_exists(action, exports))
    {
        return exports.custom(req, res, next);
    }

    return exports[action](req, res, next);
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.view = (req, res, next) => co(function*() {
    // let dashboard = req.dashboard;
    let dashboard = global.dashboard;
    let action = req.action;
    let pageID = parseInt(req.params.id) || 0;

    let item = yield dashboard.get('schedule_model').findRowByID(pageID);

    if(item instanceof Error || !item)
    {
        console.log(`Error with entity id : ${pageID} : item - `, item);

        return res.renderModule('views/errors/index', new Error('Error'));
    }

    let fieldFactory = dashboard.get('builder').setItem(item);

    fieldFactory = yield dashboard.get('builder').resolveOptionsPromises();

    let $view = dashboard.get('schedule').getView(action);

    let data = h.compact(
        [ 'queryString', (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '') ],
        [ 'navigatable', dashboard.get('navigation') ],
        [ 'schedule', dashboard.get('schedule') ],
        [ 'fieldFactory', fieldFactory ],
        [ 'session', dashboard.session ],
        [ 'page', dashboard.page ],
        [ 'action', action ],
        [ 'item', item ],
        [ 'h', h ],
        [ 'c', c ]
    );

    if (h.isCallable($view.view)) {
        $view.view(h.compact(['req', req], ['res', res], ['next', next]), action, data);
    } else {
        res.renderModule($view.view, data);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.edit = (req, res, next) => co(function*() {

    // let dashboard = req.dashboard;
    let dashboard = global.dashboard;
    let action = req.action;
    let pageID = parseInt(req.params.id) || 0;

    let item = yield dashboard.get('schedule_model')
        .findRowByID(pageID);

    // console.log(item);

    if(item instanceof Error || !item)
    {
        console.log(`Error with entity id : ${pageID} : item - `, item);

        return res.renderModule('views/errors/index', new Error('Error'));
    }

    let fieldFactory = dashboard.get('builder').setItem(item);

    fieldFactory = yield dashboard.get('builder').resolveOptionsPromises(action);

    let $view = dashboard.get('schedule').getView(action);

    let data = h.compact(
        [ 'queryString', (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '') ],
        [ 'navigatable', dashboard.get('navigation') ],
        [ 'buttons', controller.renderEditButtons() ],
        [ 'schedule', dashboard.get('schedule') ],
        [ 'fieldFactory', fieldFactory ],
        [ 'session', dashboard.session ],
        [ 'page', dashboard.page ],
        [ 'action', action ],
        [ 'item', item ],
        [ 'h', h ],
        [ 'c', c ]
    );

    if (h.isCallable($view.view)) {
        $view.view(h.compact(['req', req], ['res', res], ['next', next]), action, data);
    } else {
        res.renderModule($view.view, data);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => co(function*() {

    let back = req.priveousUrl;
    req.session.success = {};
    let dashboard = global.dashboard;

    if(req.method == POST){

        let input = req.body;
        let page = dashboard.page;
        let id = req.params.id || 0;
        let schedule = dashboard.get('schedule');

        dashboard.get('schedule_model')
            .find(id)
            .first()
            .done(item => {
                let model = schedule.getModel();

                controller.model = item ? item : new model();

                // todo: find better way to incapsulate the form builder fields.
                // let factory = new FormBuilder(schedule.getEditableFields());
                let factory = dashboard.get('builder');
                let fields = factory.getFields();

                // fields = h.object_filter(fields, field => {
                //     let name = field.getName();
                //      todo: fix bug where removes values on edit_field/
                //     return input[name];
                // });

                // decouple media datas.
                let uploaded = req.files || {};
                let files = controller.decoupleMediaFromData(fields, uploaded);

                // parse the editable fields init. by the form builder.
                let data = {};
                h.each(fields, field => {
                    let name = field.getName();

                    if(controller.isKeyField(field))
                    {
                        return;
                    }

                    /** do not process media files and translatable */
                    if (controller.isMediaField(field) || controller.isTranslatableField(field)) {
                        return;
                    }

                    if(controller.isCheckboxType(field))
                    {
                        data[name] = controller.clearCheckboxField(name, input[field.getNewName()]);
                    }

                    if(controller.isMapField(field))
                    {
                        data[field.getLat()] = input[field.getLat()];
                        data[field.getLon()] = input[field.getLon()];
                        return;
                    }

                    if(controller.isPasswordType(field))
                    {
                        data[name] = bcrypt.hashSync(input[name]);
                    } else {
                        data[name] = controller.nullifyEmptyValues(name, input[name]);
                    }
                });

                // append translatable fields
                h.object_walk(input, (value, key) => {
                    if(h.isNumeric(key))
                    {
                        // remove translatable fields from main array whic
                        //data = h.object_except(data, h.object_keys(value));

                        data[key] = value;
                    }
                });

                data = controller.cleanData(data);

                // Fill data and save it to table.
                controller.model
                    .fill(data)
                    .save()
                    .then(result => {
                        let insertedId = result ? result.insertId : null;

                        if(result && insertedId != 0 && ! (result instanceof Repository))
                        {
                            return controller.model
                                .find(insertedId)
                                .first();
                        }

                        return item ? item : controller.model;
                    })
                    .then(item => Upload.all(item, files))
                    .spread((result, item) => {
                        if(result)
                        {
                            req.session.success = {message: "Item has been saved!"};

                            return controller.manageRedirect(req, res, item);

                        } else {
                            req.session.warning = {message: "An error was occurred. Please contact the support."};
                            return res.redirect(`back`);
                        }
                    });
            });
    } else {
        return exports.custom(req, res, next);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => co(function*() {
    req.session.success = {};
    req.session.warning = {};
    // let dashboard = req.dashboard;
    let dashboard = global.dashboard;
    let pageID = parseInt(req.params.id) || 0;

    if (!h.isUndef(dashboard.get('schedule_model')) && pageID)
    {
        let item = yield dashboard.get('schedule_model').findRowByID(pageID);

        if(item)
        {
            if(yield item.delete())
            {
                req.session.success = {message: `Item was removed successfully.`};

                res.redirect('back');
            } else {
                req.session.warning = {message: `An error occurred during Item deletion...`};
            }
        }
    }
    else{
        res.sendStatus(404);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.create = (req, res, next) => co(function*() {
    // let dashboard = req.dashboard;
    let dashboard = global.dashboard;

    if(req.method == POST)
    {
        // this stuff is hardcoded.
        req.param.id = 0;

        return exports.save(req, res, next);
    }

    let page = dashboard.page;
    let action = req.action;
    let session = dashboard.session;

    let $view = dashboard.get('schedule').getView(action);

    let fieldFactory = yield dashboard.get('builder').resolveOptionsPromises(action);

    let data = h.compact(
        [ 'queryString', (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '') ],
        [ 'buttons', controller.renderEditButtons() ],
        [ 'navigatable', dashboard.get('navigation') ],
        [ 'schedule', dashboard.get('schedule') ],
        [ 'fieldFactory', fieldFactory ],
        [ 'session', session ],
        [ 'action', action ],
        [ 'page', page ],
        [ 'h', h ],
        [ 'c', c ]
    );

    if(h.isCallable($view.view))
    {
        $view.view(h.compact([ 'req', req ], [ 'res', res ], [ 'next', next ]), action, data);
    } else {

        res.renderModule($view.view, data);
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.custom = (req, res, next) => co(function*() {
    res.send('custom action');

    // todo: implement custom action.
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.listSettings = (req, res, next) => co(function*() {

    let app = global.dashboard;
    let group = req.params.group || null;
    let page = req.params.page;

    let settings = app.get('settings').listOptions(group);

    let fieldFactory = yield app.get('builder').resolveOptionsPromises();

    res.renderModule('./views/settings', h.compact(
    // res.renderModule('./views/partials/scaffold/crud/edit', h.compact(
        [ 'queryString', (req.query && (! h.empty(req.query)) ? '?' + f.toQstring(req.query) : '') ],
        [ 'navigatable', app.get('navigation') ],
        [ 'schedule', app.get('schedule') ],
        [ 'fieldFactory', fieldFactory ],
        [ 'session', app.session ],
        [ 'settings', settings ],
        [ 'page', page ],
        [ 'h', h ],
        [ 'c', c ]
    ));
});
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.saveSettings = (req, res, next) => co(function*() {

    let input = req.body;
    let group = req.params.group || 'default';
    let app = global.dashboard;
    controller.model = app.get('schedule_model');

    let data = controller.cleanData(input);

    for(let i = 0; i < h.count(data); i++)
    {
        let key = Object.keys(data)[i];
        let value = data[key];
        // let test = yield controller.model.updateOrCreate({key : key}, {value: value, group: group});
        yield controller.model.updateOrCreate({key_name: key, value: value, group: group}, ['key_name']);
    }

    req.session.success = {message: "Settings has been saved!"};
    return res.redirect('back');
});