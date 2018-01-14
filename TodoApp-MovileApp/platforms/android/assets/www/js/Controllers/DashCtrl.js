// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('DashCtrl', DashCtrl);
    DashCtrl.$inject = ['$scope', 'AboutUsServ','AuthService','$http','Configs','$state'];
    function DashCtrl($scope, people,AuthService,$http,configs,$state) {
        if (!AuthService.User.isAuthenticated)
        $state.go('login', {}, {reload: true});
            $scope.message = "work";
            $http.get(configs.API_ROUTE+'/api/users/helloworld').then((r)=>console.log(r))
    }
