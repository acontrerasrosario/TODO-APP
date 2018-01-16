angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('AboutUsCtrl', AboutUsCtrl);
AboutUsCtrl.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state', '$ionicLoading'];
function AboutUsCtrl($scope, people, AuthService, $http, configs, $ionicPopup, $state, $ionicLoading) {
            $scope.message = "work";
            $scope.members = people.all();
            console.log('klk');
            $scope.showPopup = function(item) {              
              $scope.item = item;
              var myPopup = $ionicPopup.show({
                template: '<img style="width:100%;" border="0" src="{{item.image}}"></img>',
                title: item.name,
                scope: $scope,
                buttons: [
                  { text: 'Cerrar',
                    type: 'button-positive' }
                ]
              });
            
             };
             $scope.goBack = function() { 
                $state.go('tab.settings', {}, {reload: true});
             }

}
