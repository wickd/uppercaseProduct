let Route = require('express').Router();
// let Route = require(_namespace.vendor_path() + '/router');

Route.get('/', [], (req, res, next) => {
	return res.view('home');
});

module.exports = Route;