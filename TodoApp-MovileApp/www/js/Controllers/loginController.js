// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('loginController', loginController);
loginController.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state', '$ionicLoading'];
    function loginController($scope, people, AuthService, $http, configs, $ionicPopup, $state, $ionicLoading) {
      $scope.user = {
        credential: null,
        password: null
      }
      $scope.RedirectSignUp = () => {
        $state.go('SignUp', {}, { reload: true });
      }
      $scope.LogIn = () => {
        $ionicLoading.show({
          template: '<p>Iniciando sesión...</p><ion-spinner></ion-spinner>'
        });
        AuthService.LogIn($scope.user.credential, $scope.user.password, (e) => {
          $ionicLoading.hide()
          $state.go('tab.dash', {}, { reload: false });
        },
          () => {
            $ionicLoading.hide()
            $ionicPopup.alert({
              title: 'Error',
              template: 'Por favor revisa tus credenciales.'
            });
          });
      }
      if (!AuthService.User.isAuthenticated)
        console.log(AuthService)
      console.log(configs)
      $http.get(configs.API_ROUTE + '/api/users/helloworld').then((r) => console.log(r))
    }
