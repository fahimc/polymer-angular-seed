var http = require('http');

function TwitterAdapter (){};

TwitterAdapter.prototype = {
	_callback: null,
	_payload: null,
	_data: '',
	init: function (payload, callback) {
		this._callback = callback;
		var options = {
			host: 'jsonplaceholder.typicode.com',
			path: '/posts/1',
			 port: 80,
			method: 'GET'
		};

		http.get(options, this.onResponse.bind(this));

	},
	onResponse: function (response) {
		console.log('response');
		response.on('data', this.onResponseData.bind(this));
		response.on('end', this.onResponseEnd.bind(this));
	},
	onResponseData: function (chunk) {
		console.log('data');
		this._data += chunk;
	},
	onResponseEnd: function () {
		console.log('end');
		this._callback(JSON.parse(this._data));
	}
};
module.exports = TwitterAdapter;