'use strict';

MetronicApp.controller('FreelanceController', function ($rootScope, $scope, $http, $timeout, Orders) {
    $scope.$on('$viewContentLoaded', function () {
        //Metronic.initAjax(); // initialize core components
    });

    $scope.orders = [];

    Orders.find({}).$promise.then(
        function (list) {
            $scope.orders = [];
            list.forEach(function (item) {
                item.cat = Orders.categories({
                    id: item.id
                });
                item.cur = Orders.currency({
                    id: item.id
                });
                item.usr = Orders.users({
                    id: item.id
                });

                $scope.orders.push(item);
            });
        }
    );





});