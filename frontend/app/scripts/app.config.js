'use strict';


angular
  .module('angularSeedApp')
  .config(function ($urlRouterProvider, $stateProvider, $authProvider, API_URL) {

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: '/views/main.html'
      })
      .state('jobs', {
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      });

    $urlRouterProvider.otherwise('main');

    //$authProvider.httpInterceptor = true;
    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';
    $authProvider.google({
      clientId: '100674609077-at7n9bbo7vdcqboc2qf5p0ai42a0eq36.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });
    $authProvider.facebook({
      clientId: '1019077864812469',
      url: API_URL + 'auth/facebook'
    });

    // Register my custom interceptor from /services/authinterceptor.
    // This is where the token is set in the request headers
    // $httpProvider.interceptors.push('authInterceptor');
  })
  .constant('API_URL', 'http://localhost:3000/');
