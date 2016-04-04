var path = require('path');
var app;
var Router = require(path.resolve('Server/src/routing/Router.js'));
var Service = require(path.resolve('Server/src/service/service.js'));

var Main = {
	config: {},
	init: function (_app, config){
		app = _app;
		this.config = config;
		Router.init(app, config.environment);
		this.setRoutes();
		this.setService(config.environment);
	},
	setRoutes: function (){
		Router.route();
	},
	setService: function (environment) {
		Service.init(app, environment);
	}
};

module.exports = Main;