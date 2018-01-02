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
            "remindMe":1,
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

  $scope.ViewDetails = (note) => {
    $scope.noteToUpdate = note;
    $scope.openModalDetails();
  }

  $ionicModal.fromTemplateUrl('templates/createNote.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
  });
  $scope.openModalCreate = function() {
    $scope.modalCreate.show();
  };
  $scope.closeModalCreate = function() {
    $scope.modalCreate.hide();
  };

  $ionicModal.fromTemplateUrl('templates/ViewDetails.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalDetails = modal;
  });
  $scope.openModalDetails = function() {
    $scope.modalDetails.show();
  };
  $scope.closeModalDetails = function() {
    $scope.modalDetails.hide();
  };




}
