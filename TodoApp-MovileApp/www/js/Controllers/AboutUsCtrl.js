angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('AboutUsCtrl', AboutUsCtrl);
AboutUsCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal', '$ionicPopup'];
function AboutUsCtrl($scope, people, $ionicModal, $ionicPopup) {
            $scope.message = "work";
            $scope.members = people.all();
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
}
