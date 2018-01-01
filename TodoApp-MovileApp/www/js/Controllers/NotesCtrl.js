// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesCtrl', NotesCtrl);
    NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$http'];
    function NotesCtrl($scope, people, $http) {
            $scope.message = "work";
            var apiLink = 'https://todoapp-intec.azurewebsites.net/';

            $scope.Notes = [
                {
                  title: 'Ejemplo1',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan tortor euismod, faucibus massa sit amet, imperdiet ante. Aliquam varius. ',
                  creationDate:'01/01/2018',
                  dueDate:'02/01/2018',
                  noteType:'1',
                  noteStatus:'0',
                  colorHex:'#FFFFF',
                  remindMe:'0',
                  tagName:'#fuck',
                  tagID:'1'
                },
                {
                  title: 'Ejemplo2',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan tortor euismod, faucibus massa sit amet, imperdiet ante. Aliquam varius. ',
                  creationDate:'02/01/2018',
                  dueDate:'03/01/2018',
                  noteType:'1',
                  noteStatus:'0',
                  colorHex:'#FFFFF',
                  remindMe:'0',
                  tagName:'#fuck1',
                  tagID:'2'
                }
            ];



            // $http.get(apiLink+'api/notes/getAllNotes').then(
            //   (response) => {console.log('Response', response)},
            //   () => {console.log('error')}
            // );
    }
