var express = require('express');
var router = express.Router();

var ProductionRouter = {
	route: function (app) {
		return router;
	}
};

module.exports = ProductionRouter;