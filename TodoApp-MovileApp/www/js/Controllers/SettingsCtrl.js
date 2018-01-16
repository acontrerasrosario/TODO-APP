angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('SettingsCtrl', SettingsCtrl);
SettingsCtrl.$inject = ['$scope',  '$ionicModal', '$ionicPopup'];
function SettingsCtrl($scope, people, $ionicModal, $ionicPopup) {
            
         console.log('klk');
}
