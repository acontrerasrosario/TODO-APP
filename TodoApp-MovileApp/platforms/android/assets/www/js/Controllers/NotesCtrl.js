// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesCtrl', NotesCtrl);
    NotesCtrl.$inject = ['$scope', 'AboutUsServ'];
    function NotesCtrl($scope, people) {
            $scope.message = "work";

    }
