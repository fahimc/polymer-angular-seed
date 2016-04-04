var fs = require('fs');
var path = require('path');

var MockService = {
	getGETService: function (req, res, next, callback) {
		this.getData(req, res, callback);
	},
	getPOSTService: function (req, res, next, callback) {
		this.getData(req, res, callback);
	},
	getData: function (req, res, callback) {
		var folderPath = req.url.replace('service/','');
		var servicePath = path.resolve('Server/src/service/mock/' + folderPath + '.json');
		if (fs.existsSync(servicePath)) 
		{
			callback(res, require(servicePath));
		}else {
			callback(res);			
		}
	}
};

module.exports = MockService;