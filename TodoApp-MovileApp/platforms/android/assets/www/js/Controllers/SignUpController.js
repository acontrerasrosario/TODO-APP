// Getting the Context Module
angular.module("TodoAppIntec")
    // Addig the  controller function
    // to the context module
    .controller('SignUpController', SignUpController);
SignUpController.$inject = ['$scope', 'AboutUsServ', 'AuthService', '$http', 'Configs', '$ionicPopup', '$state'];
function SignUpController($scope, people, AuthService, $http, configs, $ionicPopup, $state) {
    $scope.user = {};
    $scope.SignUp = () => {
        var  name = $scope.user.name
            , password = $scope.user.password
            , lastName = $scope.user.lastName
            , email = $scope.user.email
            , username = $scope.user.username
            , OnSuccess = function (){
                var myPopup = $ionicPopup.show({
                    // template: '<input type="password" ng-model="data.wifi">',
                    title: 'User has signed up.',
                    subTitle: 'go ahead!',
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                        text: '<b>ok</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $state.go('login', {}, {reload: true});
                        }
                      }
                    ]
                  });

                  myPopup.then(function(res) {
                    console.log('Tapped!', res);
                  });
            }
            , OnError;
        AuthService.SignUp(name, password, lastName, email, username,OnSuccess)
    }
}
