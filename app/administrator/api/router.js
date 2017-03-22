let config = require('config');
let api = require('express').Router();
let validator = require('./validator');
let controller = require('./controller');
let response = require('./lib/apiResponse');

/* + ----------------------------------------
 * |    API routes.
 * + ----------------------------------------
 */
api.use(response);
api.delete('/attachment/:id*?', [validator.deleteAttachment], controller.deleteAttachment);



//api route not found
api.use((req, res, next) => {
    res.api.NOT_FOUND = {'endpoint': req.path};
});

module.exports = api;