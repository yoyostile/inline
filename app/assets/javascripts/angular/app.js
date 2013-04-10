var app = angular.module('inline', ['ui']).config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
