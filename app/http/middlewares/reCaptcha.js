let Settings = require('../app/administrator/models/settings');
let SettingsService = require('../app/services/settingsService');
let GoogleRecaptcha = require('google-recaptcha');

module.exports = function * (req, res, next){
    let reCaptchaResponse = req.body['g-recaptcha-response'];
    let options = yield (new Settings()).getPublic();
    let settings = (new SettingsService(options));
    let reCaptchaSecret = settings.getOption('site::google_recaptcha_secret');
    let reCaptcha = new GoogleRecaptcha({secret: reCaptchaSecret});
    reCaptcha.verify({response: reCaptchaResponse}, (error) => {
        if (error) {
            res.send({isHuman: false});
        }else {
            next();
        }
    });
};






