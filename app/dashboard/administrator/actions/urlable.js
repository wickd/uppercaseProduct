let f = require('../helpers/functions');
let h = require('../helpers');

class Urlable {

    /**
     * Urlable constructor.
     */
    constructor(url) {
        //
        this.url = url
    }

    /**
     * Parse url like php.
     *
     * @param url
     * @return {{}}
     */
    parseUrl(url) {
        if (typeof url == 'string') {
            // output following: scheme, host, user, pass, path, query, fragment
            var output = {};

            var split_scheme = url.split('//');

            // now we assume that we have: sheme, and the rest of the url after //
            if (split_scheme.length == 2) {
                // now we have the "scheme"
                // do not add if this URL is provided: //hostname/path?query=value#anchor
                if (split_scheme[0].length) {
                    output.scheme = split_scheme[0].replace(':', '');
                }

                // we're now splitting the URL on first slash /
                // and assume that we'll get: host, (user and pass, if any);

                var split_url = split_scheme[1].split('/');

                if (split_url.length == 2) {
                    // check if user/pass are provided
                    var split_auth_hostname = split_url[0].split('@');

                    output.host = split_auth_hostname[1];

                    if (split_auth_hostname.length == 2) {
                        // now split the auth part of the hostname with ":"
                        var split_user_info = split_auth_hostname[0].split(':');

                        if (split_user_info.length == 2) {
                            // assume that both user and pass are provided now
                            output.user = split_user_info[0];
                            output.pass = split_user_info[1];
                        } else {
                            // assume that only "user" is provided
                            output.user = split_user_info[0];
                        }
                    } else {
                        // assume that no auth info was provided in the URL
                        // first splitted element is the actual hostname
                        output.host = split_auth_hostname[0];
                    }

                    // now let's split the query/anchor from path
                    var split_query = split_url[1].split('?');

                    output.path = '/' + split_query[0];

                    if (split_query.length == 2) {
                        // now split the anchor out of query string
                        var split_anchor = split_query[1].split('#');

                        // add the query without anchor
                        output.query = split_anchor[0];

                        // add anchoer
                        if (split_anchor.length == 2) {
                            output.fragment = '#' + split_anchor[1];
                        }
                    } else {
                        output.query = split_query[0];
                    }
                }
            }

            return output;
        }
    }

    /**
     * combine query strings form, dashboard url and crud
     * @param url
     * @returns {string}
     */
    combineQstrings() {

        //combine query string params
        let schema = f.urlParse(this.url);
        let app = global.dashboard;
        let combined = f.toQstring(h.merge(schema.query, app.request.query));

        return `${schema.pathname}?${combined}`
    }


}

module.exports = Urlable;