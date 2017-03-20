let language = require('../app/baseModel');
let Home = require('../app/frontend/home/model');

//private functions
let setVars = (vars) => {
    let arr = {};
    for (var i = 0; i < vars.length; i++) {
        arr[vars[i]["name"]] = vars[i]["value"];
    }

    return arr;
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next)=> {
    let basePath = req.originalUrl.split("/");
    if (typeof req.session.language == 'undefined' || req.session.language == null) {
        let path = req.originalUrl == "/" ? "" : req.originalUrl

        language
            .getDefaultLanguage()
            .then((row)=> {
                req.session.language = row
                let currentUrl = `/${row.slug}`
                if (basePath[1] == row.slug || basePath[1].length == 2) {
                    currentUrl = ''
                }
                return [language.getVariables(row.id), currentUrl];
            })
            .spread((resp, url) => {
                req.session.vars = setVars(resp);
                return res.redirect(`${url}${path}`);
            });

    }
    else {
        if (basePath[1] != req.session.language.slug) {
            if (basePath[1].length == 2) {

                return Home
                    .getLangonSlug(basePath[1])
                    .then((response) => {
                        if (response) {
                            req.session.language = response;
                            basePath[1] = req.session.language.slug;
                        }
                        return language.getVariables(response.id);
                    })
                    .then((resp) => {
                        req.session.vars = setVars(resp);
                        return res.redirect(`${basePath.join("/")}`)
                    });
            } else {
                return res.redirect(`/${req.session.language.slug}${basePath.join("/")}`)
            }
        } else {    
            return next()
        }
    }
}