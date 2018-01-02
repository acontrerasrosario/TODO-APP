// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('NotesCtrl', NotesCtrl);
NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal','$http', 'Configs'];
function NotesCtrl($scope, people, $ionicModal,$http,configs) {
  $scope.message = "work";

  $scope.newNote = {
            "title":null,
            "description":null,
            "type":"1",
            "dueDate":null,
            "color":null,
            "remindMe":null,
        }

  $scope.MyNotes= [];


  $http.get(configs.API_ROUTE+'getAllNotes/').then(
    (response)=> { console.log('success',response)},
    (response) => {
      console.log('error',response);
    }
  );

  $scope.addNewNote = () => {
      $http.post(configs.API_ROUTE+'createNewNote', $scope.newNote).then(
        (response)=> {
          console.log('success',response);
          $scope.newNote = {};
      },
        (response) => {
          console.log('error',response);
        }
      );
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };


}
