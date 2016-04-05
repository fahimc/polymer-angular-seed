'use strict';

angular.module('moduleName').directive('moduleName', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'module/moduleName/template/moduleName.html',
		scope: {},
		controller: 'moduleNameController'
	}
});