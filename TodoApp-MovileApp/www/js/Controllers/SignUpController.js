// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('SignUpController', SignUpController);
SignUpController.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state', '$ionicLoading'];
function SignUpController($scope, people, AuthService, $http, configs, $ionicPopup, $state, $ionicLoading) {
  $scope.user = {};
  $scope.SignUp = () => {
    $ionicLoading.show({
      template: '<p>Creando cuenta...</p><ion-spinner></ion-spinner>'
    });
    var name = $scope.user.name
      , password = $scope.user.password
      , lastName = $scope.user.lastname
      , email = $scope.user.email
      , username = $scope.user.credential
      , OnSuccess = function () {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          // template: '<input type="password" ng-model="data.wifi">',
          title: 'Usuario Registrado',
          scope: $scope,
          buttons: [
            {
              text: '<b>Iniciar sesión</b>',
              type: 'button-positive',
              onTap: function (e) {
                $state.go('login', {}, { reload: true });
              }
            }
          ]
        });

        myPopup.then(function (res) {
          console.log('Tapped!', res);
        });
      }
      , OnError = () => {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          // template: '<input type="password" ng-model="data.wifi">',
          title: 'Error.',
          subTitle: 'No se ha podido registrar, verifica los datos.',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>ok</b>',
              type: 'button-positive',
              onTap: function (e) {
                $state.go('login', {}, { reload: true });
              }
            }
          ]
        });
      };
    AuthService.SignUp(name, password, lastName, email, username, OnSuccess, OnError)
  }
}
