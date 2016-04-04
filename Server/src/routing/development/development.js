var express = require('express');
var path = require('path');
var router = express.Router();

var DevelopmentRouter = {
	route: function (app) {
		router.use('/bower_components', express.static('bower_components'));
		router.use(express.static('App'));
		app.use(require('connect-livereload')());
		return router;
	}
};

module.exports = DevelopmentRouter;