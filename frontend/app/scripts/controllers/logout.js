'use strict';


angular.module('angularSeedApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    if (!$auth.isAuthenticated())
      return;

    $auth.logout()
      .then(function () {
        $state.go('login');
      });
  });
