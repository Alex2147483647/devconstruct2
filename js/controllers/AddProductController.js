MetronicApp.controller('AddProductController', function ($rootScope, $scope, $http, $timeout, Products, Currency, LoopBackAuth, Users) {
    $scope.$on('$viewContentLoaded', function () {

        if (!Users.isAuthenticated()) {
            $('[data-target="#loginForm"]').trigger('click');
        }

        $scope.currency = Currency.find({});

        $scope.add_product = function () {
            if (!Users.isAuthenticated()) {
                $('[data-target="#loginForm"]').trigger('click');
            } else {
                Products.create({
                        "title": [
                            $('#prod-title').val()
                        ],
                        "category_id": $('#cat-id').val(),
                        "description": [
                            $('#prod-desc').val()
                        ],
                        "attachment": [
                            [""]
                        ],
                        "attributes_browser": [
                            $('#browser').val()
                        ],
                        "attributes_compatibility": [
                            $('#with').val()
                        ],
                        "user_id": LoopBackAuth.currentUserId,
                        "sales": 0,
                        "price": $('#prod-price').val(),
                        "currency_id": $('#prod-cur').val(),
                        "attributes_columns": $('#columns').val(),
                        "attributes_tpl_type": $('#template-style').val(),
                        "demo_url": $('#demi-link').val(),
                        "tags": $('#tags').val(),
                        "comment": $('#moder-msg').val(),
                        "seo_url": $('#prod-title').val()
                    }, function (product) {
                        if (typeof product.id != "undefined" && product.id > 0) {
                            swal({
                                    title: "Продукт добавлен",
                                    text: "После проверки Ваш продукт будет опубликован",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonText: "Okay!",
                                    closeOnConfirm: true
                                },
                                function () {
                                    $rootScope.$state.transitionTo('store', {
                                        reload: true,
                                        inherit: false,
                                        notify: true
                                    });
                                    $rootScope.settings.layout.pageAutoScrollOnLoad = 50;
                                });

                        } else {
                            console.log('f');
                        }
                    }
                );
            }
        }
    });
});
