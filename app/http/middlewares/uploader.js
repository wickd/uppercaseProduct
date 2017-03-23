let mime = require('mime');
let multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './temp')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
        }
    })
});