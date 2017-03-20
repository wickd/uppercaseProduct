let mime = require('mime');
let multer = require('multer');
let router = require('express').Router();
let config = require('config');
let auth = require('../../middlewares/auth');
let guest = require('../../middlewares/guest');
let controller = require('./administrator/controller');
let application = require('./administrator/bootstrap');
let action = require('./administrator/helpers/router');
let authController = require('./controllers/authController');
let templatable = require('./administrator/middlewares/template');
let dashboardController = require('./controllers/dashboardController');
let updateRequest = require('./administrator/middlewares/updateRequest');
// let response = require('../administrator/api/libraries/apiResponse');

//file rename on upload
let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './temp')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
        }
    })
});


/* + ----------------------------------------
 * |   Dashboard Api routes.
 * + ----------------------------------------
 */

// router.use('/api',[response,auth.api],require('../administrator/api/router'));

//template middleware
router.use(templatable);

/* + ----------------------------------------
 * |    Guest routes.
 * + ----------------------------------------
 */
router.get('/login', guest, action('get_login'), authController.login);
router.post('/login', guest, action('post_login'),authController.attemptLogin);
router.post('/ajax/login',authController.ajaxLogin);

/* + ----------------------------------------
 * |    Dashboard routes.
 * + ----------------------------------------
 */

//security middleware
// router.use(auth.midd);

router.use('/api',require('../../app/administrator/api/router'));
router.get('/', action('dashboard'));
router.get('/pages/:page', [application, action('index')], controller.index);
router.get('/pages/:page/:id/:action', [application, action()], controller.actions);
router.post('/pages/:page/:id/save', [application, action('save'), upload.any(), updateRequest], controller.save);
router.get('/pages/:page/create-new', [application, action('create')], controller.create);
router.post('/pages/:page/create-new', [application, action('post-create'), upload.any(), updateRequest], controller.create);
router.get('/logout', action('logout'), authController.logout);

router.get('/settings/:page/:group*?', application, controller.listSettings);
router.post('/settings/:page/:group*?', [application, action('save-settings'), upload.any(), updateRequest], controller.saveSettings);

/**
 * catch errors
 */
router.use((req, res)=> {
    !res.headersSent && res.sendStatus(404)
});

/**
 * Module exports.
 */
module.exports = router;