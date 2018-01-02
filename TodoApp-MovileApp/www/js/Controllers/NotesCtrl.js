// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('NotesCtrl', NotesCtrl);
NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal'];
function NotesCtrl($scope, people, $ionicModal) {
  $scope.message = "work";

  $scope.newNote = {
            "title":null,
            "description":null,
            "type":"1",
            "dueDate":null,
            "color":null,
            "remindMe":null,
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
