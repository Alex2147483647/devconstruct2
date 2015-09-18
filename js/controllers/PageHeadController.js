MetronicApp.controller('PageHeadController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        //console.log($('.form-create-category'));
        //
        //$('.form-create-category').on('click', function () {
        //    var category_id = 0;
        //    $('#input-category-name').val().split(',').forEach(function(item) {
        //        $http.post({method: 'PUT', url: 'http://localhost:3000/api/categories?access_token=caasdassdf', data: {
        //            "category_id": ++category_id,
        //            "name": [
        //                item
        //            ],
        //            "parent_id": 0
        //        }});
        //    });
        //    //$http.post({method: 'PUT', url: 'http://localhost:3000/api/categories?access_token=caasdassdf', data: {
        //    //
        //    //}});
        //});

        Metronic.initAjax(); // initialize core components        
    });


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageAutoScrollOnLoad = 1500;
});