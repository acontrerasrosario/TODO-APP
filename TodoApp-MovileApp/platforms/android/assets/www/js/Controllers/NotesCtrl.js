// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesCtrl', NotesCtrl);
    NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$http'];
    function NotesCtrl($scope, people, $http) {
            $scope.message = "work";
            var apiLink = 'https://todoapp-intec.azurewebsites.net/';
            $http.get(apiLink+'api/notes/getAllNotes').then(
              (response) => {console.log('Response', response)},
              () => {console.log('error')}
            );
    }
