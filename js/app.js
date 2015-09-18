var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ngResource",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "lbServices",
    "ngCart",
    "securityUser"
]);

angular.module('MetronicApp').config(function(LoopBackResourceProvider) {
    LoopBackResourceProvider.setUrlBase('http://devconstruct.com:3000/api');
});

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    });
}]);


//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', function ($rootScope, $scope, $http, $timeout, ngCart, Users, LoopBackAuth) {
    $scope.$on('$viewContentLoaded', function () {
    });

    console.log(LoopBackAuth);

    //$rootScope.userIsAuth = Users.isAuthenticated();
    //if (Users.isAuthenticated()) {
    //    $rootScope.user = JSON.parse(LoopBackAuth.currentUserData);
    //    $rootScope.userIsAuth = true;
    //}

    $rootScope.userLogin = function (email, password, form) {
        Users.login({
            email: email,
            password: password
        }, function (result) {
            console.log(result);
            $(form).trigger('click');
            $rootScope.user = LoopBackAuth.currentUserData;
            $rootScope.userErrorLogin = false;
            $rootScope.userIsAuth = true;
        }, function (error) {
            $rootScope.userErrorLogin = true;
        });
    };

    $rootScope.userLoginButton = function() {
        $rootScope.userLogin($('#loginForm [name="username"]').val(), $('#loginForm [name="password"]').val(), '#loginForm .close');
    };

    $rootScope.userRegister = function () {
        $rootScope.userRegisterErrors = {
            isError: false,
            Errors: [
                {email: false},
                {fullName: false},
                {login: false},
                {password: false},
                {confirm: false},
                {emailExists: false},
                {loginExists: false},
                {agree: false},
                {username: false},
                {server: false}
            ],
            setError: function (error) {
                this.Errors[error] = true;
                this.isError = true;
            }
        };

        var _today = new Date();
        var dateToday = _today.getYear() + '-' + _today.getMonth() + '-' + _today.getDay() + ' ' + _today.getHours() + ':' + _today.getMinutes() + ':' + _today.getSeconds(),
            fullName = $('#registration [name="fullname"]').val(),
            country = $('#registration [name="country"]').val(),
            city = $('#registration [name="city"]').val(),
            password = $('#registration [name="password"]').val(),
            confirm = $('#registration [name="confirm"]').val(),
            agree = $('#registration [name="agree"]:checked').length,
            email = $('#registration [name="email"]').val(),
            rEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            username = $('#registration [name="username"]').val();

        if (!rEmail.test(email)) {
            $rootScope.userRegisterErrors.setError("email");
        }

        if (fullName.length < 1) {
            $rootScope.userRegisterErrors.setError("fullName");
        }

        if (username.length < 3) {
            $rootScope.userRegisterErrors.setError("username");
        }

        if (password.length < 1) {
            $rootScope.userRegisterErrors.setError("password");
        }

        if (password != confirm) {
            $rootScope.userRegisterErrors.setError("confirm");
        }

        if (agree < 1) {
            $rootScope.userRegisterErrors.setError("agree");
        }

        Users.count({
            where: {
                email: email
            }
        }, function (result) {
            if (result.count == 0) {
                Users.count({
                    where: {
                        username: username
                    }
                }, function (result) {
                    if (result.count == 0) {
                        if (!$rootScope.userRegisterErrors.isError) {
                            Users.create({
                                "firstname": [
                                    fullName
                                ],
                                "lastname": [
                                    ""
                                ],
                                "country_id": country,
                                "city": city,
                                "password": password,
                                "username": username,
                                "email": email,
                                "last_seen": dateToday,
                                "created": dateToday,
                                "lastUpdated": dateToday
                            }, function (result) {
                                $rootScope.userLogin(email, password, '#registration .close');
                            }, function (errors) {
                                $rootScope.userRegisterErrors.setError("server");
                            });
                        }
                    } else {
                        $rootScope.userRegisterErrors.setError("loginExists");
                    }
                });
            } else {
                $rootScope.userRegisterErrors.setError("emailExists");
            }
        });
    };

    $rootScope.userLogout = function () {
        Users.logout({
            access_token: LoopBackAuth.accessTokenId
        });
        $rootScope.userIsAuth = false;
    };
});

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', function ($rootScope, $scope, Categories) {
        $rootScope.categories = [];

        Categories.find().$promise.then(
            function (list) {
                $rootScope.categories_developer = [];
                $rootScope.categories = [];
                list.forEach(function (item) {
                    if (item.type == "store") {
                        $rootScope.categories_developer.push(item);
                    } else {
                        $rootScope.categories.push(item);
                    }
                });
            }
        );

    }
);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Redirect any unmatched url (404)
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/home.html",
            data: {
                pageTitle: 'Главная',
                pageSubTitle: ''
            },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            '/assets/admin/pages/css/tasks.css',

                            '/assets/admin/pages/scripts/index3.js',
                            '/assets/admin/pages/scripts/tasks.js',
                            '/js/controllers/HomeController.js'
                        ]
                    });
                }]
            }
        })
        .state('blog', {
            url: "/blog",
            templateUrl: "views/blog.html",
            data: {
                pageTitle: 'Блог',
                pageSubTitle: 'блог MetronicApp'
            }
        })
        .state('freelance', {
            url: "/freelance",
            templateUrl: "views/freelance.html",
            data: {
                pageTitle: 'Услуги',
                pageSubTitle: ''
            },
            controller: "FreelanceController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/assets/admin/pages/css/freelance.css',
                            '/js/controllers/FreelanceController.js'
                        ]
                    });
                }]
            }
        })
        .state('freelance.add_edit', {
            url: "/add-edit",
            templateUrl: "views/add_order_item.html",
            data: {
                pageTitle: 'Добавить заказ',
                pageSubTitle: ''
            },
            controller: "FreelanceAddEditController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/assets/admin/pages/css/freelance.css',
                            '/js/controllers/FreelanceAddEditController.js'
                        ]
                    });
                }]
            }
        })
        .state('freelance.add_edit.order', {
            url: "/{order_url}",
            data: {
                pageTitle: 'Редактировать заказ',
                pageSubTitle: ''
            },
            resolve: {
                order_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.order_url;
                }]
            }
        })
        .state('freelance.category', {
            url: "/{category_url}",
            resolve: {
                category_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.category_url;
                }]
            }
        })
        .state('freelance.order', {
            url: "/{category_url}/{order_url}",
            templateUrl: "views/order_item.html",
            data: {
                pageTitle: 'Заказ ',
                pageSubTitle: 'Спецификация проекта'
            },
            controller: "OrderItemController",
            resolve: {
                order_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.order_url;
                }],
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/OrderItemController.js'
                        ]
                    });
                }]
            }
        })
        .state('news', {
            url: "/news",
            templateUrl: "views/news.html",
            data: {
                pageTitle: 'Новости',
                pageSubTitle: 'Очень крутые новости'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/assets/global/plugins/select2/select2.css',
                            '/assets/admin/pages/css/freelance.css'
                        ]
                    });
                }]
            }

        })
        .state('help', {
            url: "/help",
            templateUrl: "views/help.html",
            data: {
                pageTitle: 'Помощь',
                pageSubTitle: 'Вам тут помогут)'
            },
            controller: "",
            resolve: {}
        })
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {
                pageTitle: 'Профиль пользователя',
                pageSubTitle: ''
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            '/assets/admin/pages/css/profile.css',
                            '/assets/admin/pages/css/tasks.css',

                            '/assets/admin/pages/scripts/profile.js',
                            '/js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/home.html",
            data: {
                pageTitle: 'User Profile',
                pageSubTitle: 'user profile dashboard sample'
            }
        })
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {
                pageTitle: 'User Account',
                pageSubTitle: 'user profile account sample'
            }
        })
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {
                pageTitle: 'User Help',
                pageSubTitle: 'user profile help sample'
            }
        })
        .state("profile.reviews", {
            url: "/reviews",
            templateUrl: "views/profile/reviews.html",
            data: {
                pageTitle: 'User reviews',
                pageSubTitle: 'user profile reviews sample'
            }
        })
        .state("profile.store", {
            url: "/store",
            templateUrl: "views/profile/store.html",
            data: {
                pageTitle: 'Store',
                pageSubTitle: 'user store reviews sample'
            }
        })
        .state('store', {
            url: "/store",
            templateUrl: "views/store.html",
            data: {
                pageTitle: 'Магазин',
                pageSubTitle: ''
            },
            controller: "StoreController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/StoreController.js',
                            '/assets/admin/pages/css/freelance.css'
                        ]
                    });
                }]
            }
        })
        .state('store.add_edit', {
            url: "/add-edit",
            templateUrl: "views/add_product_item.html",
            data: {
                pageTitle: 'Добавить товар',
                pageSubTitle: ''
            },
            controller: "AddProductController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [

                            '/js/controllers/AddProductController.js'
                        ]
                    });
                }]
            }

        })
        .state('store.add_edit.product', {
            url: '/{product_url}',
            data: {
                pageTitle: 'Редактировать товар',
                pageSubTitle: ''
            },
            resolve: {
                product_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.product_url;
                }]
            }
        })
        .state('store.cart', {
            url: "/cart",
            templateUrl: "views/cart.html",
            data: {
                pageTitle: 'Корзина ',
                pageSubTitle: ''
            },
            controller: "StoreCartController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/StoreCartController.js'
                        ]
                    });
                }]
            }
        })
        .state('store.category', {
            url: "/{category_url}",
            templateUrl: "views/store.html",
            data: {
                pageTitle: 'Каталог',
                pageSubTitle: ''
            },
            resolve: {
                category_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.category_url;
                }]
            }
        })
        .state('store.product', {
            url: "/{category_url}/{product_url}",
            templateUrl: "views/product.html",
            data: {
                pageTitle: 'Товар',
                pageSubTitle: ''
            },
            controller: "StoreItemController",
            resolve: {
                product_url: ['$stateParams', function ($stateParams) {
                    return $stateParams.product_url;
                }],
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/StoreItemController.js'
                        ]
                    });
                }]
            }
        });
}]);

//MetronicApp.config(function(LoopBackResourceProvider) {
//    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
//});
/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.translite = function (str) {
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
}]);