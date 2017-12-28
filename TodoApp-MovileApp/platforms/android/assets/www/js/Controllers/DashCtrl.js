// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('DashCtrl', DashCtrl);
    DashCtrl.$inject = ['$scope', 'AboutUsServ'];
    function DashCtrl($scope, people) {
            $scope.message = "work";

    }
