angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('FormCtrl', FormCtrl);
FormCtrl.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state', '$ionicLoading'];
function FormCtrl($scope, people, AuthService, $http, configs, $ionicPopup, $state, $ionicLoading) {          
    $scope.goBack = function() { 
        $state.go('tab.settings', {}, {reload: true});
     }  
       
}
