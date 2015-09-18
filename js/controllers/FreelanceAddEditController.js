'use strict';

MetronicApp.controller('FreelanceAddEditController', function ($rootScope, $scope, $http, $timeout, $stateParams, Orders, LoopBackAuth) {



    $scope.translite = function(str) {
        var transl = new Array();
        transl['А'] = 'A';
        transl['а'] = 'a';
        transl['Б'] = 'B';
        transl['б'] = 'b';
        transl['В'] = 'V';
        transl['в'] = 'v';
        transl['Г'] = 'G';
        transl['г'] = 'g';
        transl['Д'] = 'D';
        transl['д'] = 'd';
        transl['Е'] = 'E';
        transl['е'] = 'e';
        transl['Ё'] = 'Yo';
        transl['ё'] = 'yo';
        transl['Ж'] = 'Zh';
        transl['ж'] = 'zh';
        transl['З'] = 'Z';
        transl['з'] = 'z';
        transl['И'] = 'I';
        transl['и'] = 'i';
        transl['Й'] = 'J';
        transl['й'] = 'j';
        transl['К'] = 'K';
        transl['к'] = 'k';
        transl['Л'] = 'L';
        transl['л'] = 'l';
        transl['М'] = 'M';
        transl['м'] = 'm';
        transl['Н'] = 'N';
        transl['н'] = 'n';
        transl['О'] = 'O';
        transl['о'] = 'o';
        transl['П'] = 'P';
        transl['п'] = 'p';
        transl['Р'] = 'R';
        transl['р'] = 'r';
        transl['С'] = 'S';
        transl['с'] = 's';
        transl['Т'] = 'T';
        transl['т'] = 't';
        transl['У'] = 'U';
        transl['у'] = 'u';
        transl['Ф'] = 'F';
        transl['ф'] = 'f';
        transl['Х'] = 'X';
        transl['х'] = 'x';
        transl['Ц'] = 'C';
        transl['ц'] = 'c';
        transl['Ч'] = 'Ch';
        transl['ч'] = 'ch';
        transl['Ш'] = 'Sh';
        transl['ш'] = 'sh';
        transl['Щ'] = 'Sch';
        transl['щ'] = 'sch';
        transl['Ъ'] = '';
        transl['ъ'] = '';
        transl['Ы'] = 'Y';
        transl['ы'] = 'y';
        transl['Ь'] = '';
        transl['ь'] = '';
        transl['Э'] = 'E';
        transl['э'] = 'e';
        transl['Ю'] = 'Yu';
        transl['ю'] = 'yu';
        transl['Я'] = 'Ya';
        transl['я'] = 'ya';
        transl[' '] = '-';
        return str.split('').map(function (item) {
            return transl[item] != null ? transl[item] : item;
        }).join('');
    }







    $scope.addorder = function () {




        $('.has-error').removeClass('has-error');

        if (jQuery('#title').val().length == 0) {
            jQuery('#title').parent().addClass('has-error');
        }

        if (jQuery('#description').val().length == 0) {
            jQuery('#description').parent().addClass('has-error');
        }


        if (jQuery('[name="category"]:checked').length > 0) {
            Orders.create({

                "user_id": LoopBackAuth.currentUserId,
                "title": [
                    $('#title').val()
                ],
                "price": $('#j-order-price').val(),
                "type": $('[name="service_type"]:checked').val(),
                "date_create": "2015-09-17 00:09:21",
                "seo_url": $scope.translite($('#title').val()),
                "category_id": $('[name="category"]:checked').val(),
                "currency_id": $('#j-order-currency').val(),
                "pro": $('#for-pro:checked').length,
                "description": [
                    $('#description').val()
                ],
                "country_id": $('#j-order-country').val(),
                "city": $('#j-order-city').val(),
                "user_email": "test@test.ru",
                "user_name": "Someuser",
                "skills": [
                    $('#j-tag-select').val()
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
                                $rootScope.$state.go('freelance');
                                $rootScope.settings.layout.pageAutoScrollOnLoad = 50;
                            });

                    } else {
                        console.log('f');
                    }
                });

        } else {

        }
    };
    $scope.$on('$viewContentLoaded', function () {

    });


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageAutoScrollOnLoad = 1500;
});

