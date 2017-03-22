let HttpStatus = require('./apiStatus')

class ApiLib {

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
        let proto = this.constructor.prototype;

        return new Proxy({}, {
            /**
             * setter interceptor
             * @param obj
             * @param name
             * @param value
             */
            set: function (obj, name, value) { //eg api.OK = {id:1}

                if (Object.getOwnPropertyDescriptor(proto, name)) { //setter is valid
                    api.data = value;
                    api[name];
                } else if (HttpStatus.hasOwnProperty(name)) { //status code is valid
                    api.data = value;
                    api._response(HttpStatus[name])
                }
            },
            /**
             * getter interceptor
             * @param obj
             * @param name
             * @returns {*}
             */
            get: function (obj, name) { //eg api.OK

                if (Object.getOwnPropertyDescriptor(proto, name)) {//getter is valid
                    return api[name]
                } else if (HttpStatus.hasOwnProperty(name)) {//status code is valid
                    return api._response(HttpStatus[name])
                }
            }
        });
    }

    /**
     * attach proxy
     * @param res
     * @returns {Proxy|*|{ipaddress, port, type}|{host, port, proxyAuth, headers}}
     */
    static attach(res){
        return new this(res).proxy();
    }


}


module.exports = ApiLib;