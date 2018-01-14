(function () {
    'use strict';

    angular
        .module('TodoAppIntec')
        .factory('AuthService', factory);

    factory.$inject = ['$http', 'Configs','$state'];

    function factory($http, Configs, $state) {

      var currentIdentity = {
            username : null,
            name  : null,
            lastName  : null,
            email  : null,
            isAuthenticated : false,
            basicTkn : null
        };

        var Value = localStorage.getItem("Identity");

        if (Value){
            var valueObj = JSON.parse(Value);
            currentIdentity = valueObj;
            $http.defaults.headers.common.Authorization = currentIdentity.basicTkn;
            $state.go('tab.dash', {}, { reload: false });
        }


        var API_ROUTE = Configs.API_ROUTE;

        var LogIn = (Identifier,Password,OnSuccess,OnError)=>{
            if (Identifier && Password){
                var credentials = {
                    credential : Identifier,
                    password : Password
                };
                $http.post(API_ROUTE+'/api/users/SignIn',credentials).then((e)=>{
                    currentIdentity = e.data;
                    currentIdentity.isAuthenticated = true;
                    $http.defaults.headers.common.Authorization = currentIdentity.basicTkn;
                    localStorage.setItem('Identity', JSON.stringify(currentIdentity))
                    if (angular.isFunction(OnSuccess)) OnSuccess(e);
                },(e)=>{
                    if (angular.isFunction(OnError)) OnError(e);
                });

            }else throw 'Missing Identifier and/or password';
        }
        var LogOut = () => {
          localStorage.removeItem('Identity');
          location.reload();
        }

        var signUp = (name,password,lastName,email,username,OnSuccess,OnError)=>{
            var newUser = {
                "name":name,
                "password":password,
                "lastName":lastName,
                "email":email,
                "username":username
            }
            $http.post(API_ROUTE+'/api/users/SignUp',newUser).then((e)=>{
                if (angular.isFunction(OnSuccess)) OnSuccess(e);
            },(e)=>{
                if (angular.isFunction(OnError)) OnError(e);
            });
        }
    
        var AuthService = {
            User : currentIdentity,
            LogIn: LogIn,
            LogOut: LogOut,
            SignUp:signUp
        }
        return AuthService;
    }
})();
