'use strict'

// MODULE
angular.module('app', [
    'ngRoute'
]);

// ROUTES
angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    
    $routeProvider.
        when('/', {
            templateUrl: 'pages/docGenerator/docGenerator.html',
            controller: 'docGeneratorController'
        });
}]);