var grunt;
var Logger = require('../../module/Logger.js');
var Task = {
  taskRunner: null,
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    this.taskRunner = _taskRunner;
  },
  getConfig: function () {
    return {

    }
  },
  camelCaseToDash : function( myStr ) {
    return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  },
  onModuleFile: function (abspath, rootdir, subdir, filename) {
    var path = abspath.replace("Grunt/resource/template/module/", "moduleName/");
    var directory = grunt.option('directory') ? grunt.option('directory') : 'App/js/src/module/';
    this.onFile(abspath, rootdir, subdir, filename,path,directory);
  },
  onModuleTestFile: function (abspath, rootdir, subdir, filename) {
    var path = abspath.replace("Grunt/resource/template/moduleTest/", "moduleName/");
    var directory = 'Test/module/';
    this.onFile(abspath, rootdir, subdir, filename,path,directory);
  },
  onFile: function (abspath, rootdir, subdir, filename, _path, directory) {
    var name = grunt.option('name');
    var path = _path.replace(/moduleName/g, name);
    filename = filename.replace(/moduleName/g, name);
    var folderPath = path.replace(path.substr(path.lastIndexOf('/') + 1), '');
    var content = grunt.file.read(abspath);
    if (grunt.option('folder')) content = content.replace('module/moduleName', grunt.option('folder') +  '/moduleName');
    content = content.replace(/moduleName/g, name);
    content = content.replace(/module-name/g, this.camelCaseToDash(name));
    grunt.file.mkdir(directory + folderPath);
    grunt.file.write(directory + folderPath + "/" + filename, content);
  },
  createModule: function () {
    var name = grunt.option('name');
    if(!name)
    {
      Logger.error('please provide the name of the module --name=exampleModule');
      return;
    }
    var folder = grunt.option('folder') ? grunt.option('folder') : 'module';
    grunt.file.mkdir("App/js/src/" + folder + "/" + name);

    grunt.file.recurse('Grunt/resource/template/module', this.onModuleFile.bind(this));
    //update app
    var mainContent = grunt.file.read('App/js/src/main.js');
    mainContent = mainContent.replace(']);', ",'" + name + "']);");
    grunt.file.write('App/js/src/main.js', mainContent);
    //update less
    var lessContent = grunt.file.read('App/style/main.less');
    lessContent += "\n@import './App/js/src/" + folder + "/" + name + "/style/" + name + "';";
    grunt.file.write('App/style/main.less', lessContent);

    this.createModuleTest();
  },
  createModuleTest: function () {
    var name = grunt.option('name');
    if(!name)
    {
      Logger.error('please provide the name of the module --name=exampleModule');
      return;
    }
    grunt.file.mkdir("Test/module/" + name);
    grunt.file.recurse('Grunt/resource/template/moduleTest', this.onModuleTestFile.bind(this));
  },
  register: function () {
    grunt.registerTask('cm', this.createModule.bind(this));
    grunt.registerTask('create-module', this.createModule.bind(this));
  }
};

module.exports = Task;
