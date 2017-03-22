let HttpStatus = require('./apiStatus')

class apiResponse {
    /**
     * statuses can be overwritten
     *
     *  get OK() {
     *    return this.response(HttpStatus.OK, 'Success!');
     * }
     * @param res
     * @returns {*}
     */
    constructor(res={}) {

        this._res = res;
        this._data = null;
        this._code = 0;
    }

    /**
     *set json data
     * @param {JSON|*} data
     * @constructor
     */
    set data(data) {
        this._data = data;
    }

    /**
     *get json data
     * @returns {JSON|*}
     * @constructor
     */
    get data() {
        return this._data;
    }

    /**
     * send json response
     * @param status
     * @param message
     */
    _response(status, message = '') {

        let code = this._code || status;

        return this._res
            .status(status)
            .json({
                code: code,
                message: message || HttpStatus.getStatusText(code),
                data: this.data
            })
    }

    /**
     * Metaprogramming: proxy interceptor
     * @returns {Proxy}
     */
    proxy() {

        let api = this;

        return new Proxy({}, {
            set: function (obj, name, value) { //eg api.OK = {id:1}

                if (Object.getOwnPropertyDescriptor(apiResponse.prototype, name)) { //setter is valid
                    api.data = value;
                    api[name];
                } else if (HttpStatus.hasOwnProperty(name)) { //status code is valid
                    api.data = value;
                    api._response(HttpStatus[name])
                }
            },
            get: function (obj, name) { //eg api.OK

                if (Object.getOwnPropertyDescriptor(apiResponse.prototype, name)) {//getter is valid
                    return api[name]
                } else if (HttpStatus.hasOwnProperty(name)) {//status code is valid
                    return api._response(HttpStatus[name])
                }
            }
        });
    }


    //other statuses------------------------------------------------------------------

    get MISSING_FIELDS() {
        this._code = HttpStatus.MISSING_FIELDS;
        return this._response(HttpStatus.BAD_REQUEST)
    }

}


/**
 * exporter
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

    res.api = new apiResponse(res).proxy();

    next()
}