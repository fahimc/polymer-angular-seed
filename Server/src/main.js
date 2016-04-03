var path = require('path');
var app;
var Router = require(path.resolve('Server/src/routing/Router.js'));

var Main = {
	config: {},
	init: function (_app, config){
		app = _app;
		this.config = config;
		Router.init(app, config.environment);
		this.setRoutes();
	},
	setRoutes: function (){
		Router.route();
	}
};

module.exports = Main;