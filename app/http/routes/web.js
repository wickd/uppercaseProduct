let Route = require('express').Router();
let use = require(_namespace.helpers_path() + '/controllerLoader');

Route.get('/', [], use('HomeController@index'));

Route.get('/about', [], use('PagesController@about'));

Route.get('/careers', [], use('CareersController@index'));

Route.get('/services', [], (req, res, next) => {
	return res.view('services/index');
});
Route.get('/contact', [], (req, res, next) => {
    return res.view('contact');
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