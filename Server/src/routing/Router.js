var path = require('path');
var app;

var Router = {
	environment: 'production',
	init: function (_app, _environment){
		app = _app;
		this.environment = _environment;
		this.route();
	},
	route: function () {
		this.addEnvironmentRoutes();
	},
	addEnvironmentRoutes: function () {
		var environmentRouter = require(path.resolve('Server/src/routing/' + this.environment  + '/' + this.environment + '.js'));
		var routes = environmentRouter.route(app);
		app.use('/',routes);
	}
};

module.exports = Router;