var app = angular.module('app', ['ngRoute','mainView']);

function Main($routeProvider, $templateCache) {
  $routeProvider.when('/', {
      controller: 'mainViewController',
      templateUrl: 'view/mainView/template/mainView.html'
    });
}

app.config(['$routeProvider', Main]);
