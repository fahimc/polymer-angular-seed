'use strict';

angular.module('mainView').directive('mainView', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'view/mainView/template/mainView.html',
		scope: {},
		controller: 'mainViewController'
	}
});