// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('AboutUsCtrl', AboutUsCtrl);
    AboutUsCtrl.$inject = ['$scope', 'AboutUsServ'];
    function AboutUsCtrl($scope, people) {
        $scope.message = "work";
        $scope.members = people.all();
        var s= '';
    }
