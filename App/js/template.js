angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('view/mainView/template/mainView.html',
    "<div class=\"mainView\"><example-component></example-component></div>"
  );


  $templateCache.put('view/newView/template/newView.html',
    "<div class=\"newView\"></div>"
  );

}]);
