let fs = require('fs');
let b = require('bluebird');

exports.move = (file, destination) => {
    let deferred = b.defer();

    fs.rename(file.path, _namespace.public_path() + `/${destination}/${file.filename}`, (err) => {
        if (err) {
            console.log('err', err);
            deferred.resolve(false);
        }
        else {
            console.log('File moved : ', file.filename)
            deferred.resolve(true);
        }
    })

    return deferred.promise;
};