var fs = require('fs')
var path = require('path')
let b = require('q');

module.exports = {

    /**
     * Get directories.
     *
     * @param srcpath
     * @returns {*|Array.<T>|{TAG, CLASS, ATTR, CHILD, PSEUDO}}
     */
    getDirectories: (srcpath) => {
        "use strict";
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory()
        })
    },

    getFiles: (srcpath) => {
        // "use strict";
        let deferred = b.defer();

        fs.readdir(srcpath, (err, files) => {

            deferred.resolve(files);

        });

        return deferred.promise;
    },

    /**
     *
     * @param srcpath
     * @returns {*}
     */
    getAbsolutePath: (srcpath) => {
        "use strict";
        return path.dirname(require.main.filename) + srcpath;
    }
};

