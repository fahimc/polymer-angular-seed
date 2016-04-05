'use strict';

var express = require('express');
var open = require('open');
var net = require('net');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var compression = require('compression');
var serveIndex = require('serve-index');
var app = express();
var config = {
  serverPort: 8999,
  directory: process.argv[2].split('=')[1]
};

var Server = {
  init: function () {
    this.setup();
    this.findFreePort();
  },
  setup: function () {
    app.use(compression());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());
    app.use(serveIndex(config.directory));
    app.use(express.static(config.directory));
    app.use(require('connect-livereload')());
  },
  getPortNumber: function () {
    return config.serverPort += 100;
  },
  findFreePort: function () {
    var server = net.createServer(function (socket) {
      socket.write('Echo server\r\n');
      socket.pipe(socket);
    });

    server.listen(this.getPortNumber());
    server.on('error', function (e) {
      console.log(e);
      Server.findFreePort();
    });
    server.on('listening', function (e) {
      server.close();
      Server.start(false);
    });
  },
  start: function () {
    app.listen(config.serverPort);
    console.log('server listening at %s', config.serverPort);
    open('http://localhost:' + config.serverPort);
  }
};

Server.init();
