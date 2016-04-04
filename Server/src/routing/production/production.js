var express = require('express');
var Service = require(path.resolve('Server/src/routing/production/service/service.js'));
var router = express.Router();

var ProductionRouter = {
	route: function (app) {
		Service.init(app, router);
		return router;
	}
};

module.exports = ProductionRouter;