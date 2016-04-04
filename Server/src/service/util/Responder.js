var fs = require('fs');
var path = require('path');


function Responder (payload, req, res, callback) {
	this.payload = payload;
	this.res = res;
	this.req = req;
	this.callback = callback;
};

Responder.prototype = {
	payload: null,
	res: null,
	req: null,
	callback: null,
	adapter: null,
	getData: function () {
		var folderPath = this.getPath();
		var servicePath = path.resolve('Server/src/service/' + folderPath + '.js');
		if (fs.existsSync(servicePath)) 
		{
			var ServiceAdapter = require(servicePath);
			var adapter = new ServiceAdapter();
			adapter.init(this.payload, this.onAdapterResponse.bind(this));
		}else {
			this.callback(res);			
		}
	},
	onAdapterResponse: function (data){
		this.callback(this.res, data);	
	},
	getPath: function () {
		return this.req.url.replace('service/','');
	}
};

module.exports = Responder;