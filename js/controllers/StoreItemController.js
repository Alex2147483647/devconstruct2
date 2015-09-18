MetronicApp.controller('StoreItemController', function ($rootScope, $scope, $http, $timeout, $stateParams, Products, Users, Currency) {



    $scope.$on('$viewContentLoaded', function () {


        $scope.single_product = Products.find({
            filter: {
                where: {
                    "seo_url": $stateParams.product_url
                }
            }
        }).$promise.then(
            function (list) {
                $scope.single_product = [];
                list.forEach(function (item) {
                    item.cat = Products.categories({
                        id: item.id
                    });
                    item.cur = Products.currency({
                        id: item.id
                    });
                    item.usr = Products.users({
                        id: item.id
                    });

                    $scope.single_product.push(item);
                });



            }
        );




    });


});
