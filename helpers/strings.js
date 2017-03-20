let sha1 = require('sha1')
let prefix = '0)gH_xXq+XA(Z+?xK'
let adminPrefix = 'pmVzU["s@k1Ip#1.y'

exports.generatePasswordHash = (password) => {
	return sha1(prefix+password)
}

exports.generateAdminPasswordHash = (password) => {
	return sha1(adminPrefix+password)
}

exports.random = (length) => {
	if(!length) length = 10
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i<length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}