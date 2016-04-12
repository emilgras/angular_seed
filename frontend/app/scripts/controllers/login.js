'use strict';


angular.module('angularSeedApp')
  .controller('LoginCtrl', function ($scope, alert, $auth, $state) {

    $scope.submit = function () {

      var credentials = {
        email: $scope.email,
        password: $scope.password
      };

      $auth.login(credentials)
        .then(function (res) {
          var message = "Thanks for coming back " + res.data.user.email;

          if (!res.data.user.active)
            var message = "Just a reminder, please activate your account soon :)";

          alert('success', 'Welcome', message);
          console.log("Is now authenticated: " + $auth.isAuthenticated());
          $state.go('main');
        })
        .catch(handleError);
    };


    // This is used to login using social buttons (Google & Facebook)
    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function (res) {
        alert('success', 'Welcome', "Thanks for coming back " + res.data.user.displayName);
      }, handleError);
    };


    // Reusable error function
    function handleError(err) {
      var errMessage;

      switch (err.status) {
        case 401:
          errMessage = "Unable to login";
          break;
        default:
          break;
      }
      alert('warning', 'Something went wrong :( ', errMessage);
    }

  });
