// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('loginController', loginController);
        loginController.$inject = ['$scope', 'AboutUsServ','AuthService','$http','Configs','$ionicPopup','$state'];
    function loginController($scope, people,AuthService,$http,configs,$ionicPopup,$state) {
            $scope.user = {
                credential : null,
                password : null
            }
            $scope.RedirectSignUp = ()=>{
                $state.go('SignUp', {}, {reload: true});
            }
            $scope.LogIn=()=>{
                AuthService.LogIn($scope.user.credential,$scope.user.password,(e)=>{
                    console.log(e)
                    var myPopup = $ionicPopup.show({
                        // template: '<input type="password" ng-model="data.wifi">',
                        title: 'User has signed in.',
                        subTitle: 'go ahead!',
                        scope: $scope,
                        buttons: [
                          { text: 'Cancel' },
                          {
                            text: '<b>ok</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                $state.go('tab.dash', {}, {reload: true});
                            }
                          }
                        ]
                      });
                    
                      myPopup.then(function(res) {
                        console.log('Tapped!', res);
                      });
                },
            ()=>{
                var myPopup = $ionicPopup.show({
                    // template: '<input type="password" ng-model="data.wifi">',
                    title: 'User has not signed in.',
                    subTitle: 'go ahead!',
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                        text: '<b>ok</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                        
                        }
                      }
                    ]
                  }); 
            });
            }
            $scope.message = "work";
            console.log(AuthService)
            if (!AuthService.User.isAuthenticated)
            console.log(AuthService)
            console.log(configs)
            $http.get(configs.API_ROUTE+'/api/users/helloworld').then((r)=>console.log(r))
    }
