// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('DashCtrl', DashCtrl);
    DashCtrl.$inject = ['$scope', 'AboutUsServ','AuthService','$http','Configs'];
    function DashCtrl($scope, people,AuthService,$http,configs) {
            $scope.message = "work";
            console.log(AuthService)
            console.log(configs)
            $http.get(configs.API_ROUTE+'/api/users/helloworld').then((r)=>console.log(r))
    }
