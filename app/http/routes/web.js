let Route = require('express').Router();
let wrap = require('co').wrap;

Route.get('/', [], wrap((req, res, next) => {
	return res.view('home');
}));

module.exports = Route;