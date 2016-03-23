'use strict';

angular.module('mainView').directive('mainView', function ($templateCache) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'mainView/template/mainView.html',
		scope: {},
		controller: 'mainViewController'
	}
});