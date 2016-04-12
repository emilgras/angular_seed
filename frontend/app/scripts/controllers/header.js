'use strict';


angular
  .module('angularSeedApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };
  });
