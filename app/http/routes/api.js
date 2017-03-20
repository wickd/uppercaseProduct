let Route = require('express').Router();
let wrap = require('co').wrap;

Route.get('/test', [], wrap((req, res, next) => {
	return res.send('This is api route');
}));

module.exports = Route;