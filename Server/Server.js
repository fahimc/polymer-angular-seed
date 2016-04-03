'use strict';

var express = require('express');
var compression = require('compression');
var open = require('open');
var net = require('net');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var Main = require(path.resolve('Server/src/main.js'));

var Server = {
  environment: 'production',
  config: {
    port: 9000,
    directory: 'Dist'
  },
  init: function () {
    this.setEnvironment();
    this.loadConfig();
    this.setup();
    this.start();
  },
  setEnvironment: function () {
    var environment = process.argv[2].split('=')[1];
    if(environment) this.environment = environment;
  },
  loadConfig: function () {
    this.config = require(path.resolve('Server/config/' + this.environment + '.json'));
  },
  setup: function () {
    var directory = path.resolve(this.config.directory);
    app.use(compression());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());
   
    
    Main.init(app, {environment:this.environment});
  },
  start: function () {
    app.listen(this.config.port);
    console.log('server listening at %s', this.config.port);
    open('http://localhost:' + this.config.port );
  }
};

Server.init();
