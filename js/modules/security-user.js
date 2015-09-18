(function (window, angular, undefined) {
    'use strict';
    var module = angular.module("securityUser", []).factory('User', ['$rootScope', 'Users', 'LoopBackAuth', function ($rootScope, Users, LoopBackAuth) {
        var propsPrefix = "$User_0";

        //if (Users.isAuthenticated()) {
        //    propsPrefix = "$User_" + LoopBackAuth.currentUserId + "$";
        //    $rootScope.currentUser = JSON.parse(localStorage[propsPrefix + 'data'] != undefined ? localStorage[propsPrefix + 'data']);
        //}

        function User() {
            this.data = JSON.parse(load("data"));
            this.isAuth = false;
            this.rememberMe = false;

            this.errors = {
                login: false,
                register: {
                    isError: false,
                    errors: {
                        email: false,
                        fullName: false,
                        login: false,
                        password: false,
                        confirm: false,
                        emailExists: false,
                        loginExists: false,
                        agree: false,
                        username: false,
                        server: false

                    },
                    setError: function (error) {
                        this.Errors[error] = true;
                        this.isError = true;
                    }
                }
            };

        }

        User.prototype.logIn = function (email, password, remember, formSelector) {
            var self = this;
            Users.login({
                email: email,
                password: password
            }, function (result) {
                $(formSelector).trigger('click');
                self.data = result.user;
                self.errors.login = false;
                self.isAuth = true;
                self.rememberMe = remember;
            }, function (error) {
                self.errors.login = false;
            });
        };

        User.prototype.save = function () {
            var storage = this.rememberMe ? localStorage : sessionStorage;
            storage[propsPrefix + "data"] = JSON.stringify(this.data);
        };

        User.prototype.logout = function () {
            Users.logout({
                access_token: LoopBackAuth.accessTokenId
            });
            this.isAuth = false;
            this.data = null;
            this.rememberMe = false;
        };

        User.prototype.register = function (data) {
            var _today = new Date(),
                regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            var dateToday = _today.getYear() + '-' + _today.getMonth() + '-' + _today.getDay() + ' ' + _today.getHours() + ':' + _today.getMinutes() + ':' + _today.getSeconds();

            if (!regexEmail.test(data.email)) {
                this.errors.register.setError("email");
            }

            if (data.fullName.length < 1) {
                this.errors.register.setError("fullName");
            }

            if (data.username.length < 3) {
                this.errors.register.setError("username");
            }

            if (data.password.length < 1) {
                this.errors.register.setError("password");
            }

            if (data.password != data.confirm) {
                this.errors.register.setError("confirm");
            }

            if (data.agree < 1) {
                this.errors.register.setError("agree");
            }
        };

        function load(name) {
            var key = propsPrefix + name;
            return localStorage[key] || sessionStorage[key] || null;
        }
    }]);
})(window, window.angular);
