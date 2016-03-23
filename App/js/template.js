angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('mainView/template/mainView.html',
    "<div class=\"mainView\"><example-component></example-component></div>"
  );

}]);
