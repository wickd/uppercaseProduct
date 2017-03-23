let Route = require('express').Router();
let use = require(_namespace.helpers_path() + '/controllerLoader');

Route.get('', [], use('HomeController@index'));

Route.get('/about', [], use('PagesController@about'));

Route.get('/careers', [], use('CareersController@index'));

Route.get('/services', [], use('PagesController@services'));

Route.get('/contact', [], use('PagesController@contact'));

Route.get('/portfolio', [], use('PortofolioController@index'));

Route.get('/portfolio/:slug/constructions/', [], use('ConstructionsController@index'));

Route.get('/portfolio/:category_slug/constructions/:construction_slug/details', [], use('ConstructionsController@show'));

module.exports = Route;