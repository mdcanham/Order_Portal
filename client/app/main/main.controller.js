'use strict';

angular.module('orderPortalApp')
  .controller('MainCtrl', function ($scope, $http, $location, Auth) {

    $scope.categories = [];
    $scope.products = [];

    var loadCategories = $http.get('/api/products/getCategories').success(function(categories){
      $scope.categories = categories;
    });

    var loadProducts = $http.get('/api/products').success(function(products) {
      $scope.products = products;
      for(var i = 0; i < $scope.products.length; i++){
        $scope.products[i].quantity = 0;
      }
    });

    function resetProductQuantity(){
      for(var i = 0; i < $scope.products.length; i++){
        $scope.products[i].quantity = 0;
      }
    }

    loadCategories;
    loadProducts;
    resetProductQuantity();

    $scope.addProduct = function() {
      if($scope.newProduct === '') {
        return;
      }
      $http.post('/api/products', { name: $scope.newProduct });
      $scope.newProduct = '';
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

    $scope.order = function(form){
      $scope.submitted = true;
      $scope.sent = false;
      $scope.error = false;
      $scope.nothingEntered = false;
      var orderArray = [];
      var emptyCount = 0;

      orderArray = JSON.parse(JSON.stringify($scope.products));

      if(form.$valid) {
        for(var i = 0; i < orderArray.length; i++){
          if(orderArray[i].quantity < 1){
            emptyCount++;
          }
        }

        orderArray.unshift(Auth.getCurrentUser());

        if(orderArray.length - 1 > emptyCount){
          $http.post('/api/products/order', orderArray);
          $scope.sent = true;
        } else {
          $scope.nothingEntered = true;
        }

        resetProductQuantity();
      } else {
        $scope.error = true;
      }
    };
  });
