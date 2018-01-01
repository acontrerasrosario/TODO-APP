(function () {
    'use strict';

    angular
        .module('TodoAppIntec')
        .factory('AuthService', factory);

    factory.$inject = ['$http','Configs'];

    function factory($http,Configs) {
        var API_ROUTE = Configs.API_ROUTE;

        var currentIdentity = {
            username : null,
            name  : null,
            lastName  : null,
            email  : null,
            isAuthenticated : false
        };

        var LogIn = (Identifier,Password,OnSuccess,OnError)=>{
            if (Identifier && Password){
                var credentials = {
                    credential : Identifier,
                    password : Password
                };
                $http.post(API_ROUTE+'/api/users/SignIn',credentials).then((e)=>{
                    currentIdentity = e.data;
                    currentIdentity.isAuthenticated = true;
                    if (angular.isFunction(OnSuccess)) OnSuccess(e);
                },(e)=>{
                    if (angular.isFunction(OnError)) OnError(e);
                });

            }else throw 'Missing Identifier and/or password';
        }


    
        var AuthService = {
            User : currentIdentity,
            LogIn : LogIn
        }
        return AuthService;
    }
})();