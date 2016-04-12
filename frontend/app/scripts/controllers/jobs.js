'use strict';


angular.module('angularSeedApp')
  .controller('JobsCtrl', function ($scope, API_URL, $http, alert) {
    $http.get(API_URL + 'jobs')
      .success(function(jobs) {
        $scope.jobs = jobs;
      })
      .error(function(err) {
        alert('warning', 'Unable to get jobs', err.message);
      });
  });

