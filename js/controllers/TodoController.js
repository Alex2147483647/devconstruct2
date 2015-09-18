'use strict';

MetronicApp.controller('TodoController', function ($rootScope, $scope, $http, $timeout, $stateParams, Orders, Countries) {


    $scope.addorder = function () {


        $rootScope.countries = Countries.find();

        $('.has-error').removeClass('has-error');

        if (jQuery('#title').val().length == 0) {
            jQuery('#title').parent().addClass('has-error');
        }

        if (jQuery('#description').val().length == 0) {
            jQuery('#description').parent().addClass('has-error');
        }

        if (jQuery('#description').val().length == 0) {
            jQuery('#description').parent().addClass('has-error');
        }

        if (jQuery('[name="category"]:checked').length > 0) {
            Orders.create({
                "date_end": "2015-09-09 00:09:21",
                "user_id": 0,

                "title": [
                    jQuery('#title').val()
                ],
                "price": jQuery('#j-order-price').val(),
                "type": jQuery('[name="service_type"]:checked').val(),
                "date_create": "2015-10-09 00:09:21",
                "ready_url": $rootScope.transliterate(jQuery('#title').val()),
                "category_id": jQuery('[name="category"]:checked').val(),
                "currency": jQuery('#j-order-currency').val(),
                "pro": false,
                "description": [
                    jQuery('#description').val()
                ],
                "country": jQuery('#j-order-country').val(),
                "city": jQuery('#j-order-city').val(),
                "user_email": "test@test.ru",
                "user_name": "Someuser",
                "skills": [
                    jQuery('#j-tag-select').val()
                ]
            }).$promise.then(function (order) {
                    if (typeof order.id != "undefined" && order.id > 0) {

                        swal({
                                title: "Заказ добавлен",
                                text: "После проверки Ваш заказ будет опубликован",
                                type: "success",
                                showCancelButton: false,

                                confirmButtonText: "Okay!",
                                closeOnConfirm: true
                            },
                            function () {
                                $rootScope.$state.go('todo');
                                $rootScope.settings.layout.pageAutoScrollOnLoad = 50;

                            });

                    } else {
                        console.log('f');
                    }
                });

        } else {

        }
    };

    $scope.$on('ngRepeatFinished', function (ev) {
        if ($stateParams.catid > 0) {
            jQuery('input[type=checkbox][value="' + $stateParams.catid + '"]').trigger('click');
        }
        $rootScope.filterOrders();
    });

    $scope.$on('$viewContentLoaded', function () {

        //console.log(Categories.find());

        jQuery('.check-parent').unbind('click');

        jQuery('[name="order_name"], [name="freelancer_name"]').on('change', function () {
            $rootScope.filterOrders();
        });

        //$rootScope.categories = Categories.find();

        Metronic.initAjax();
    });


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageAutoScrollOnLoad = 1500;
});

