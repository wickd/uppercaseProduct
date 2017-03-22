let Route = require('express').Router();
// let Route = require(_namespace.vendor_path() + '/router');

Route.get('/', [], (req, res, next) => {
	return res.view('home');
});
Route.get('/about', [], (req, res, next) => {
	return res.view('about');
});

Route.get('/careers', [], (req, res, next) => {
	return res.view('careers');
});
Route.get('/contact', [], (req, res, next) => {
	return res.view('contact');
});
Route.get('/services', [], (req, res, next) => {
	return res.view('services/index');
});
Route.get('/portfolio', [], (req, res, next) => {
	return res.view('portfolio/index');
});

Route.get('/portfolio/list', [], (req, res, next) => {
	return res.view('portfolio/list');
});
Route.get('/portfolio/details', [], (req, res, next) => {
	return res.view('portfolio/details');
});

module.exports = Route;