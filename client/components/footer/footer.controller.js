'use strict';

angular.module('orderPortalApp')
  .controller('FooterCtrl', function ($scope, $location, Auth) {

    $scope.author = 'Matthew Canham';
    $scope.location = 'Auckland';
    $scope.socialLinks = [{
      title: 'Twitter',
      url: 'https://twitter.com/matthewcanham',
      image: 'assets/images/twitter.png'
    },
    {
      title: 'Github',
      url: 'https://github.com/mdcanham',
      image: 'assets/images/github.png'
    }]

    // $scope.menu = [{
    //   'title': 'Home',
    //   'link': '/'
    // }];
    //
    // $scope.isCollapsed = true;
    // $scope.isLoggedIn = Auth.isLoggedIn;
    // $scope.isAdmin = Auth.isAdmin;
    // $scope.getCurrentUser = Auth.getCurrentUser;
    //
    // $scope.logout = function() {
    //   Auth.logout();
    //   $location.path('/login');
    // };
    //
    // $scope.isActive = function(route) {
    //   return route === $location.path();
    // };
  });
