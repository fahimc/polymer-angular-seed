var grunt;
var Logger = require('../../module/Logger.js');
var fs = require('fs.extra');
var Path = require('path');
var Task = {
  taskRunner: null,
  DIST_FILE_NAME:'components',
  IMPORT_FILE_NAME:'import',
  OUTPUT_FOLDER:'App/js/',
  POLYMER_FOLDER:'components',
  IMPORT_PATH:'Components/',
  ASSET_PATH:'component/',
  folderIgnoreList:['theme'],
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    this.taskRunner = _taskRunner;
  },
  getConfig: function () {
    return {
      shell: {
        polybuild: {
          command: 'polybuild Components/import.html',
          options: {
            execOptions: {
            }
          }
        }
      }
    }
  },
  cleanImportLink: function (str) {
   var link = str.replace('href="','').replace('"','');
   link = link.substring(0,link.lastIndexOf('/'));
   return link;
 },
 copyResourceToDist: function (folderPath) {
  if(!this.isIgnoreFolder(folderPath)){
    var importFilePath = this.IMPORT_PATH;
    grunt.file.recurse(Path.resolve(importFilePath,folderPath + '/resource/') + '/',this.onFiles.bind(this));
 }
},
onFiles: function (abspath, rootdir, subdir, filename) {

  var rootFolder = rootdir.replace(/\\/g,'/').replace('/resource/','');
  var componentName = rootFolder.substring(rootFolder.lastIndexOf('/') + 1,rootFolder.length);
  var dest = this.taskRunner.dirname + '/App/js/' + this.ASSET_PATH + componentName + '/' + (subdir ? subdir + '/' : '') + 'resource/' + filename;
  grunt.file.copy(abspath,dest);
  console.log(rootFolder);
},
isIgnoreFolder: function (folderPath) {
  if(folderPath.indexOf('bower_components/') >= 0){
    return true;
  }
  for(var a = 0; a < this.folderIgnoreList.length; a++) { 
    if(folderPath === this.folderIgnoreList[a]){
      return true;
    }
  }
  return false;
},
customTask: {
  replaceBowerPaths: function () {
    var filePath = this.IMPORT_PATH + this.IMPORT_FILE_NAME + '.build.html';
    var importName = this.IMPORT_FILE_NAME;
    var content = grunt.file.read(filePath);
    content = content.replace(/bower_components/g, this.POLYMER_FOLDER);
    content = content.replace('src="' + importName + '.build.js"', 'src="components.js"');
    content = content.replace('assetpath="src/', 'assetpath="' + this.ASSET_PATH);
    grunt.file.write(filePath, content);
  },
  copyFilesToDist: function () {
    var output = this.OUTPUT_FOLDER;
    var htmlPath = this.IMPORT_PATH + this.IMPORT_FILE_NAME + '.build.html';
    var jsPath = this.IMPORT_PATH + this.IMPORT_FILE_NAME  + '.build.js';
    grunt.file.copy(htmlPath, this.OUTPUT_FOLDER + 'components.html');
    grunt.file.copy(jsPath, this.OUTPUT_FOLDER + 'components.js');
  },
  cleanPolybuild: function () {
    var filePath = this.IMPORT_PATH + this.IMPORT_FILE_NAME;
    grunt.file.delete(filePath + '.build.html', {
      force: true
    });
    grunt.file.delete(filePath + '.build.js', {
      force: true
    });
  },
  copyResourceFolders: function () {
    var filePath = this.IMPORT_PATH + this.IMPORT_FILE_NAME + '.html';
    var content = grunt.file.read(filePath);
    var arr = content.match(/href="([^"]*)"/g);
    if(arr && arr.length > 0 )
    {
      for(var a = 0; a < arr.length; a++){
        var folderPath = this.cleanImportLink(arr[a]);
        this.copyResourceToDist(folderPath);
      }
    }
  }
},
register: function () {
  for(var key in this.customTask){
    grunt.registerTask(key, this.customTask[key].bind(this));    
  }
  grunt.registerTask('polymer-vulcanize', ['shell:polybuild','replaceBowerPaths','copyFilesToDist','copyResourceFolders','cleanPolybuild']);
}
};

module.exports = Task;
