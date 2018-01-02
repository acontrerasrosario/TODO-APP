// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesGroupsCtrl', NotesGroupsCtrl);
    NotesGroupsCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal'];
    function NotesGroupsCtrl($scope, people,$ionicModal) {
            $scope.message = "work";

            $scope.newTag = {
                "tagName":null,
                "description": null
            }
    
      $ionicModal.fromTemplateUrl('templates/modalGroup.html', {
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
