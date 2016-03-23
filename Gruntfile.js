require('shelljs/global');
var Logger = require('./Grunt/module/Logger.js');
var grunt;
var TaskRunner = {
  TASK_FILE_NAME: 'task.js',
  CONFIG_FILE_NAME: 'package.json',
  config: {},
  package: {},
  gruntConfig: {},
  dirname:null,
  init: function (_grunt) {
    grunt = _grunt;
    this.dirname = __dirname;
    this.loadPackageJSON();
    this.loadConfig();
    this.loadNPMTasks();
    this.register();
    this.setInitConfig();
  },
  register: function () {
    grunt.registerTask('install', this.install.bind(this));
    grunt.registerTask('default', this.defaultTask.bind(this));
    this.registerTaskModules();
  },
  registerTaskModules: function () {
    for (var key in this.config.tasks) {
      var path = this.config.tasks[key];
      if (grunt.file.exists(path + '/' + this.TASK_FILE_NAME)) {
        var task = require(__dirname + '/' + path + '/' + this.TASK_FILE_NAME);
        if (task.init && task.register && task.getConfig) {
          task.init(grunt,this);
          this.addToInitConfig(task.getConfig());
          task.register();
        }else{
        	Logger.error('"' + key + '" task doesnt contain init(), getConfig() or register(). Task not loaded');
        }
      }
    }
  },
  defaultTask: function () {
  	Logger.info('\n\nTip: To see available tasks type "grunt help"');
  },
  addToInitConfig: function (config) {
  	if(!config)
  	{
  		return; 
  	}
    for (var key in config) {
      //check if key exists in initConfig
      if (this.gruntConfig[key]) {
      		//has key
      		for(var subKey in config[key]){
      			if(!this.gruntConfig[key][subKey])
      			{
      			this.gruntConfig[key][subKey] = config[key][subKey];
      			}else{
      				Logger.warn(key + ' - ' + subKey + ' already in use please change the sub task name');
      			}
      		}
      }else{
      		//not in initConfig
      		this.gruntConfig[key] = config[key];
      }
    }
  },
  loadNPMTasks: function () {
  	for (var key in this.package.dependencies){
  		if(key.indexOf('grunt-') >= 0)
  		{
  			grunt.loadNpmTasks(key);
  		}
  	}
  },
  install: function () {
    Logger.log('\n-- INSTALLING TASK DEPENDENCIES --');
    this.loadTasks();
    this.savePackageJSON();
    this.NPMInstall();
  },
  loadPackageJSON: function () {
    this.package = grunt.file.readJSON('package.json');
  },
  loadConfig: function () {
    if (grunt.file.exists('Grunt/config.json')) {
      this.config = grunt.file.readJSON('Grunt/config.json');
    }
  },
  loadTasks: function () {
    for (var key in this.config.tasks) {
      var path = this.config.tasks[key];
      if (grunt.file.exists(path + '/' + this.CONFIG_FILE_NAME)) {
        var taskPackage = require(__dirname + '/' + path + '/' + this.CONFIG_FILE_NAME);
        this.updatePackageJSON(taskPackage.dependencies);
      }
    }
  },
  savePackageJSON: function () {
    grunt.file.write('package.json', JSON.stringify(this.package, null, 2));
  },
  NPMInstall: function () {
    Logger.info('\nInstalling all npm dependencies...\n');
    exec('npm install');
  },
  updatePackageJSON: function (dependencies) {
    for (var key in dependencies) {
      if (!this.package.dependencies[key]) {
        this.package.dependencies[key] = dependencies[key];
        Logger.ok('npm dependency added "' + key + '"');
      }
      else {
        Logger.warn('(npm dependency issue) please check "' + key + '" dependency. Found in another module. Will use version ' + this.package.dependencies[key]);
      }
    }
  },
  setInitConfig:function(){
  	 grunt.initConfig(this.gruntConfig);
  }
};

module.exports = TaskRunner.init.bind(TaskRunner);
