// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('DashCtrl', DashCtrl);
    DashCtrl.$inject = ['$scope', 'AboutUsServ','AuthService','$http','Configs','$state','$rootScope','$ionicModal'];
    function DashCtrl($scope, people,AuthService,$http,configs,$state,$rootScope,$ionicModal) {
        if (!AuthService.User.isAuthenticated)
            $state.go('login', {}, {reload: true});
            
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
           
        
            $scope.ViewDetails = (note) => {
                console.log('UPDATE NOTE info',note);
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
                $scope.noteToUpdate = note;
                $scope.openModalDetails();
                console.log('rootscope',$rootScope.Notes);
              }
        

              $ionicModal.fromTemplateUrl('templates/ViewDetails.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modalDetails = modal;
              });
              $scope.openModalDetails = function() {
                $scope.modalDetails.show();
              };
              $scope.closeModalDetails = function() {
                $scope.modalDetails.hide();
              };

        $http.get(configs.API_ROUTE+'/api/users/helloworld').then((r)=>console.log(r))

            $http.get(configs.API_ROUTE+'api/notes/getAllNotes').then(
                (response)=> { 
                  console.log('success',response)
                  arregloFix = response.data;
                    arregloFix.forEach(element => {
                        var date = new Date(element.dueDate);
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        element.dueDate = day + '/' + (monthIndex+1) + '/' + year;
                    });

                  $rootScope.Notes = _.sortBy(arregloFix, 'dueDate'); 
                },
                (response) => {
                  console.log('error',response);
                }
              );

              $scope.SortSeleted;
              $scope.TagSeleted;

              $scope.SortType = [
                {no:1, name:'Fecha ascendente'},
                {no:2, name:'Fecha descendente'},
                {no:3, name:'Tags'}
            ];

              $scope.ChangeSort = () => {
                // console.log($scope.SortSeleted);
                    switch($scope.SortSeleted) {
                        case 1:
                            $rootScope.Notes = _.sortBy(arregloFix, 'dueDate','ASC'); 
                        case 2:
                            $rootScope.Notes = _.sortBy(arregloFix, 'dueDate','DESC'); 
                        case 3:
                            $rootScope.Notes = _.sortBy(arregloFix, 'tagID', $scope.TagSeleted); 
                    }
              }

            $rootScope.Notes;
    }
