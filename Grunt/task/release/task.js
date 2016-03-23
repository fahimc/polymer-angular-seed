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
  getVersionNumber: function () {
    var appJson = grunt.file.readJSON('./app.json');
    appJson['version'] = this.bumpVersionNumber(appJson['version']);
    grunt.file.write('./app.json', JSON.stringify(appJson,null,2));
    Logger.ok("version number updated to " +  appJson['version']);
  },
  bumpVersionNumber: function (currentNumber) {
    var type = "patch";
    if (grunt.option("minor")) {
      type = "minor";
    }
    else if (grunt.option("major")) {
      type = "major";
    }
    var arr = currentNumber.split(".");
    switch (type) {
      case 'minor':
        arr[1] = Number(arr[1]) + 1;
        arr[2] = "0";
        break;
      case 'patch':
        arr[2] = Number(arr[2]) + 1;
        break;
      case 'major':
        arr[0] = "v" + String(Number(arr[0].replace("v", "")) + 1);
        arr[1] = "0";
        arr[2] = "0";
        break;
    }
    return arr.join(".");
  },
  register: function () {
    grunt.registerTask('bumpVersionNumber',this.getVersionNumber.bind(this));
    grunt.registerTask('release', ['bumpVersionNumber','dist']);
  }
};

module.exports = Task;
