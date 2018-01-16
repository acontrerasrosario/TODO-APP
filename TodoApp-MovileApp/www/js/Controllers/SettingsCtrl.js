angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('SettingsCtrl', SettingsCtrl);
SettingsCtrl.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state', '$ionicLoading'];
function SettingsCtrl($scope, people, AuthService, $http, configs, $ionicPopup, $state, $ionicLoading) {          
         
        $scope.clickAboutUs = () =>{
            console.log('klk');
            $state.go('aboutUs', {}, {reload: true});    
         };

              
        $scope.clickForm = () =>{
            console.log('klk');
            $state.go('userForm', {}, {reload: true});    
         };
}
