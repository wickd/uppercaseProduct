let mime = require('mime');
let fs = require('fs');
let path = require('path');

module.exports = (req, res, next) => {
    let file = path.resolve("./", "public", "uploads", req.params.category, req.params.filename);
    
    let fileExist = new Promise(
        (resolve, reject) => {
            return fs.stat(file, (err, stats) => {
                if (err || !stats.isFile()) return resolve(false);
                return resolve(true);
            });
        })
        .then((bool) => {
            if (bool) {
                let mimetype = mime.lookup(file);

                res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.filename);
                res.setHeader('Content-Type', mimetype);

                let stream = fs.createReadStream(file);
                stream.pipe(res);
            } else {
                res.redirect('/404')
            }
        })
        .catch((err) => {
            res.redirect('/404')
        });
}