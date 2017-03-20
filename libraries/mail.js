let q = require('bluebird')
let nodemailer = require('nodemailer');
let config = require('config').get('mail')

exports.send = (to, subject, message) => {
    let deferred = q.defer()

    var smtpConfig = {
        host: config.host,
        port: config.port,
        secure: false, // use SSL
        requireTLS: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: config.username,
            pass: config.password
        },
        logger: config.log
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.from,
        to: to,
        subject: subject,
        html: message,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            deferred.resolve(error)
        }
        else {
            deferred.resolve(false)
        }

        console.log(info)
    });

    return deferred.promise
}