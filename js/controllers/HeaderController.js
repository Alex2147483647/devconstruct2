'use strict';

MetronicApp.controller('HeaderController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        console.log('HeaderController');
        $rootScope.listCategories = Categories.find({
            where: {
                type: "freelance"
            }
        });
    });
});


MetronicApp.controller('PageHeadController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        console.log('PageHeadController');
    });
});

MetronicApp.controller('FooterController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        console.log('FooterController');
    });
});