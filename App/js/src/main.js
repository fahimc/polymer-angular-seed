var app = angular.module('app', ['ngRoute','mainView']);

function Main($routeProvider, $templateCache) {
  $routeProvider.when('/', {
      controller: 'appController',
      templateUrl: ''
    })
    .otherwise({
      redirectTo: '/'
    });
}

app.config(['$routeProvider', Main]);
