MetronicApp.controller('OrderItemController', function ($scope, $http, $timeout, $stateParams, Orders) {
    $scope.$on('$viewContentLoaded', function () {

    });






    $scope.single_order = Orders.find({
        filter: {
            where: {
                "seo_url": $stateParams.order_url
            }
        }
    }).$promise.then(
        function (list) {
            $scope.single_order = [];
            list.forEach(function (item) {

                item.cur = Orders.currency({
                    id: item.id
                });
                item.usr = Orders.users({
                    id: item.id
                });

                $scope.single_order.push(item);
            });



        }
    );




});
