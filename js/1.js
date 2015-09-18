devConstruct.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                        name: 'devConstruct',
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
                pageSubTitle: 'блог devConstruct'
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
                        name: 'devConstruct',
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
                        name: 'devConstruct',
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
                        name: 'devConstruct',
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
                        name: 'devConstruct',
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
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load();
                }]
            }
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
                        name: 'devConstruct',
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
                        name: 'devConstruct',
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
            controller: "ProductAddEditController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'devConstruct',
                        insertBefore: '#ng_load_plugins_before',
                        files: [

                            '/js/controllers/ProductAddEditController.js'
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
            url: "/shopping-cart",
            templateUrl: "views/cart.html",
            data: {
                pageTitle: 'Корзина ',
                pageSubTitle: ''
            },
            controller: "CartController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'devConstruct',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/CartController.js'
                        ]
                    });
                }]
            }
        })
        .state('store.category', {
            url: "/{category_url}",
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
                        name: 'devConstruct',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/js/controllers/StoreItemController.js'
                        ]
                    });
                }]
            }
        });
}]);

//http://ajax.googleapis.com/ajax/libs/angularjs/1.3.1/angular-resource.js