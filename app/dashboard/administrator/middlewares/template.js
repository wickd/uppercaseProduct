let pug = require('pug');
let config = require('config');
let c = require('../config.js');

module.exports = (req, res, next) => {
    /**
     * render module
     * @param view
     * @param json
     */
    res.renderModule = (view, json = {}, status = null) => {

        //todo: !!! Implement there data view composers and dashboard application init (from middleware).

        Object.assign(json,
            {
                basedir: c.get('dashboard.dashboard_path'),
                dash_version: "1.0.0",
                cache: config.get('route').cache,
                server: `${config.server}:${config.serverPort}`,
                app: global.dashboard || null,
                user: req.user || null
            });


        try {
            let file = pug.renderFile(`${json.basedir}/${view}.pug`, json);
            //status and output
            status && res.sendStatus(status);
            res.send(file);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    };

    next()
};