/**
 * API Controller
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
let co = require('co');
let attachment = require(_namespace.app_path() + '/Attachment')

//attachments
exports.deleteAttachment = (req, res, next) => co(function*() {

    let id = req.params.id;

    let item = yield (new attachment).findRowByID(id);

    if (item) {

        if (yield item.delete()) {
            res.api.OK = {id: id};
        } else {
            res.api.BAD_REQUEST;
        }
    }
    else {
        res.api.NOT_FOUND={id: id};
    }

});