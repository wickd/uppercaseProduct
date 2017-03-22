/**
 * Created by ciobanu.iulian on 12/15/2016.
 */
let co = require('co');
let controller = require('./controller')


exports.deleteAttachment = (req, res, next)=> co(function*() {

    let id = req.params.id;

    if (id) {
        next()
    }
    else {
        res.api.MISSING_FIELDS=["id"]
    }

})

