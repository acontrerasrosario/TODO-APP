// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesGroupsCtrl', NotesGroupsCtrl);
    NotesGroupsCtrl.$inject = ['$scope', 'AboutUsServ'];
    function NotesGroupsCtrl($scope, people) {
            $scope.message = "work";

    }
