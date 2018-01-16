// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('NotesGroupsCtrl', NotesGroupsCtrl);
    NotesGroupsCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal','$http', 'Configs', '$rootScope','ionicDatePicker','AuthService','$state'];
    function NotesGroupsCtrl($scope, people, $ionicModal,$http,configs,$rootScope,ionicDatePicker,AuthService,$state) {
     // if (!AuthService.User.isAuthenticated)
     // $state.go('login', {}, {reload: true});
            $scope.newTag = {
                "tagName":null
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

      $scope.MyTags = [];

      $http.get(configs.API_ROUTE+'api/notes/getAllTags').then(
        (response) => {
          console.log('getAllTags Success',response)
          $scope.MyTags = [];
          $scope.MyTags = response.data;
        },
        (response) => {
          console.log('getAllTags  Success',response)
        }
    );

    $scope.addNewTag = () => {
      var required_values = {
        "tagName": 'Nombre del tag',
      };
      var missing = [];
      var missingmsj = '';
      for (var i in required_values) {
        if ($scope.newTag[i] == null) {
          missing.push(i);
          missingmsj += `\n "${required_values[i]}" es un valor requerido. </br>`
        }
      }
      if (missing.length > 0) {
        $scope.modalCreate.hide();
        var myPopup = $ionicPopup.show({
          title: 'Error',
          subTitle: missingmsj,
          scope: $scope,
          buttons: [
            { text: 'Ok' },
          ]
        });
      } else {
        $ionicLoading.show({
          template: '<p>Creando tag...</p><ion-spinner></ion-spinner>'
        });
        $scope.newTag.id = $scope.MyTags.length + 1;
        $scope.MyTags.push($scope.newTag);
        $rootScope.Tags = $scope.MyTags;
        $scope.newTag = {};
        $scope.modalCreate.hide();
        $ionicLoading.hide();
      }
  
      
      $http.post(configs.API_ROUTE+'api/notes/CreateTag', $scope.newTag.tagName).then(
          (response)=> {
            console.log('AddnewTag success',response);
            $scope.MyTags.push(response.data);
            $scope.newTag = {};
            $rootScope.Tags = $scope.MyTags;
        },
          (response) => {
            console.log('AddNewNote error',response);
          }
        );
    }

    
  $scope.ViewDetails = (tag) => {
    console.log('UPDATE Tag info',tag);
    $http.get(configs.API_ROUTE+'api/notes/getAllTags').then(
      (response) => {
        console.log('getAllTags Success',response)
        $scope.MyTags = [];
        $scope.MyTags = response.data;
      },
      (response) => {
        console.log('getAllTags  Success',response)
      }
  );
    $scope.tagToUpdate = tag;
    $scope.openModalDetails();
    console.log('rootscope', $rootScope.Notes);

  }

  $scope.updateTag = () => {
    $http.put(configs.API_ROUTE+'api/notes/getTagByID', $scope.tagToUpdate.id).then(
      (response)=> {
        console.log('updateNote success',response);
        $scope.MyTags = [];
        $scope.MyTags = response.data;
        $rootScope.Tags = $scope.MyTags;
    },
      (response) => {
        console.log('updateNote error',response);
      }
    );
  }

    
  $scope.deleteTag = () => {
    var tagIdToUpdate = $scope.tagToUpdate.id;
    $http.delete(configs.API_ROUTE+'api/notes/DeleteTag?id='+ tagIdToUpdate).then(
      (response)=> {
        console.log('deleteTag success',response);
        $scope.MyTags  = _.without($scope.MyTags, $scope.tagToUpdate);
        $rootScope.Tags =  $scope.MyTags;
    },
      (response) => {
        console.log('deleteNote error',response);
      }
    );
    
  }


}
