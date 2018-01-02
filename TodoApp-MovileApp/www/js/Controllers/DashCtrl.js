// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('DashCtrl', DashCtrl);
    DashCtrl.$inject = ['$scope', 'AboutUsServ','AuthService','$http','Configs','$state','$rootScope'];
    function DashCtrl($scope, people,AuthService,$http,configs,$state,$rootScope) {
        if (!AuthService.User.isAuthenticated)
        $state.go('login', {}, {reload: true});
            $scope.message = "work";
            $http.get(configs.API_ROUTE+'/api/users/helloworld').then((r)=>console.log(r))

            $rootScope.Notes;


    }
