'use strict';


angular.module('angularSeedApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth, $state) {
    $scope.submit = function () {

      var credentials = {
        email: $scope.email,
        password: $scope.password
      };

      $auth.signup(credentials)
        .then(function (res) {
          alert('success', 'Account Created!', "Welcome, " + res.data.user.email + '! Please email activate your account in the next several days');
          $auth.setToken(res);
          console.log("Is now authenticated: " + $auth.isAuthenticated());
          $state.go('main');
        })
        .catch(function (err) {
          alert('warning', 'Something went wrong', err);
        });
    };
  });
