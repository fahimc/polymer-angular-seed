var fs = require('fs');
var express = require('express');
var path = require('path');
var mockService = require(path.resolve('Server/src/service/mock/mockService.js'));
var Responder = require(path.resolve('Server/src/service/util/Responder.js'));
var app;
var router = express.Router();

var Service = {
	environment: 'production',
	init: function (_app, _environment) {
		app = _app;
		this.environment = _environment;
		this.route();
	},
	route: function () {
		router.get('/service/*', this.getGETService.bind(this));
		router.post('/service/*', this.getPOSTService.bind(this));
		app.use('/',router);
	},
	getGETService: function (req, res, next) {
		switch(this.environment)
		{
			case 'development' :
			mockService.getGETService(req, res, next, this.onData.bind(this));
			break;
			default:
			var responder = new Responder(null,req,res, this.onData.bind(this));
			responder.getData();
		}
	},
	getPOSTService: function (req, res, next) {
		switch(this.environment)
		{
			case 'development' :
			mockService.getPOSTService(req, res, next, this.onData.bind(this));
			break;
			default:
			var responder = new Responder(req.body, req, res, this.onData.bind(this));
			responder.getData();
		}
	},
	onData: function (res,data) {
		res.setHeader('Content-Type', 'application/json');
		if(data)
		{
			res.send(JSON.stringify(data));
		}else {
			this.sendError(res);
		}
	},
	sendError: function (res) {
		var data = {
			error: 'Service not found'
		}
		res.send(JSON.stringify(data));
	}
};

module.exports = Service;