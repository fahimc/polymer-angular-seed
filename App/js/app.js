var app = angular.module('app', ['ngRoute','mainView']);

function Main($routeProvider, $templateCache) {
  $routeProvider.when('/', {
      controller: 'mainViewController',
      templateUrl: 'mainView/template/mainView.html'
    });
}

app.config(['$routeProvider', Main]);
;'use strict';

angular.module('mainView', []);;'use strict';

angular.module('mainView').controller('mainViewController',function($scope){

	var Controller =
	{
		init:function(){

		}
	};

	Controller.init();

	return Controller;

});;'use strict';

angular.module('mainView').directive('mainView', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'mainView/template/mainView.html',
		scope: {},
		controller: 'mainViewController'
	}
});;'use strict';

angular.module('app').controller('appController',function($scope,$rootScope){

	var Controller =
	{
		init: function () {
		}
	};

	Controller.init();

	return Controller;

});;angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('mainView/template/mainView.html',
    "<div class=\"mainView\"><example-component></example-component></div>"
  );

}]);
