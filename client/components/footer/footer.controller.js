'use strict';

angular.module('orderPortalApp')
  .controller('FooterCtrl', function ($scope) {

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
    }];
  });
