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
  onFile: function (abspath, rootdir, subdir, filename) {
    var name = grunt.option('name');
    var path = abspath.replace("grunt/resource/template/module/", "moduleName/");
    path = path.replace(/moduleName/g, name);
    filename = filename.replace(/moduleName/g, name);
    var folderPath = path.replace(path.substr(path.lastIndexOf('/') + 1), '');
    var content = grunt.file.read(abspath);
    content = content.replace(/moduleName/g, name);
    grunt.file.mkdir("App/js/src/module/" + folderPath);
    grunt.file.write("App/js/src/module/" + folderPath + "/" + filename, content);
  },
  createModule: function () {
    var name = grunt.option('name');
    if(!name)
    {
      Logger.error('please provide the name of the module --name=exampleModule');
      return;
    }
    grunt.file.mkdir("App/js/src/module/" + name);


    grunt.file.recurse('grunt/resource/template/module', this.onFile.bind(this));
    //update app
    var mainContent = grunt.file.read('App/js/src/main.js');
    mainContent = mainContent.replace(']);', ",'" + name + "']);");
    grunt.file.write('App/js/src/main.js', mainContent);
    //update less
    var lessContent = grunt.file.read('App/style/main.less');
    lessContent += "\n@import './App/js/src/module/" + name + "/style/" + name + "';";
    grunt.file.write('App/style/main.less', lessContent);
  },
  register: function () {
    grunt.registerTask('cm', this.createModule.bind(this));
  }
};

module.exports = Task;
