let HttpStatus = require('./apiStatus')
let ApiLib = require('./apiLib')

//other statuses------------------------------------------------------------------

class ApiResponse extends ApiLib {
    /**
     * statuses can be overwritten
     * getters
     *  get OK() {
     *    return this.response(HttpStatus.OK, 'Success!');
     * }
     * @param res
     * @returns {*}
     */
    constructor(res){
        super(res);
    }

    get MISSING_FIELDS() {
        this._code = HttpStatus.MISSING_FIELDS;
        return this._response(HttpStatus.BAD_REQUEST)
    }

    get ERROR_DB() {
        this._code = HttpStatus.ERROR_DB;
        return this._response(HttpStatus.BAD_REQUEST)
    }

    get ROUTE_NOT_FOUND() {
        this._code = HttpStatus.ROUTE_NOT_FOUND;
        return this._response(HttpStatus.BAD_REQUEST)
    }

    get OK_ADD_GROUP(){
        this._code = HttpStatus.OK_ADD_GROUP
        return this._response(HttpStatus.OK)
    }

    get OK_ADD_MEMBER(){
        this._code = HttpStatus.OK_ADD_MEMBER
        return this._response(HttpStatus.OK)
    }

    get OK_DELETE_GROUP(){
        this._code = HttpStatus.OK_DELETE_GROUP
        return this._response(HttpStatus.OK)
    }

    get OK_UPDATE_ORDER(){
        this._code = HttpStatus.OK_UPDATE_ORDER
        return this._response(HttpStatus.OK)
    }


}

/**
 * exporter
 * @param req
 * @param res
 * @param next
 */

module.exports = (req, res, next) => {
    res.api =  ApiResponse.attach(res);
    next()
}