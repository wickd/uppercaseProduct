let Route = require('express').Router();
let uploader = require(_namespace.middlewares_path() + '/uploader');
let use = require(_namespace.helpers_path() + '/controllerLoader');

Route.get('', [], use('HomeController@index'));

Route.get('/about', [], use('PagesController@about'));

Route.get('/careers', [], use('CareersController@index'));

Route.post('/careers', [ uploader.any() ], use('CareersController@postCareer'));

Route.get('/services/:slug?/', [], use('ServicesController@show'));

Route.get('/contact', [], use('PagesController@contact'));

Route.post('/contact', [], use('PagesController@postContact'));

Route.get('/portfolio', [], use('PortofolioController@index'));

Route.get('/portfolio/:slug/constructions/', [], use('ConstructionsController@index'));

Route.get('/portfolio/:category_slug/constructions/:construction_slug/details', [], use('ConstructionsController@show'));

module.exports = Route;