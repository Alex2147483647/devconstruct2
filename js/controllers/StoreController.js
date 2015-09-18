MetronicApp.controller('StoreController', function ($rootScope, $scope, $http, $timeout, $stateParams, Products) {
    $scope.products = [];

    var filterParamsDefault = {
        category: {},
        title: ""
    };

    $scope.filterProducts = {
        filterParams: localStorage['filter'] != undefined ? JSON.parse(localStorage['filter']) : filterParamsDefault,
        filter: function () {
            localStorage['filter'] = JSON.stringify(this.filterParams);
            var filterData = {
                filter: {
                    where: {
                        and: []
                    }
                }/*,
                include: {
                    relation: 'categories',
                    scope: {
                        fields: ['seo_url', 'name']
                    }
                }*/
            };

            if (this.filterParams.title != "") {
                filterData.filter.where.and.push({
                    title: {
                        like :  "%" + this.filterParams.title + "%"
                    }
                });
            }

            var categories = [];
            for (var category_id in this.filterParams.category) {
                if (this.filterParams.category[category_id]) {
                    categories.push(category_id);
                }
            }

            if (categories.length > 0) {
                filterData.filter.where.and.push({
                    category_id: {
                        inq: categories
                    }
                });
            }

            Products.find(filterData, function (list) {
                    console.log(list);
                    $scope.products = [];
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

                        $scope.products.push(item);
                    });
                }, function (error) {
                    //console.log(error);
                }
            );
        }
    };

    $scope.$watch($scope.filterProducts.filterParams, function () {
        $scope.filterProducts.filter();
    });

    //$scope.filterProducts.filter();


});