// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('NotesCtrl', NotesCtrl);
<<<<<<< HEAD
NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal','$http', 'Configs','ionicDatePicker'];
function NotesCtrl($scope, people, $ionicModal,$http,configs,ionicDatePicker ) {
=======
NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal','$http', 'Configs', '$rootScope'];
function NotesCtrl($scope, people, $ionicModal,$http,configs,$rootScope) {
>>>>>>> 987b0870ac5e568abfd9b7d531e630797b4b4709
  $scope.message = "work";

  $scope.newNote = {
            "title":null,
            "description":null,
            "type":"1",
            "dueDate":null,
            "color":null,
            "remindMe":1,
        }

  $scope.MyNotes= [];

  $http.get(configs.API_ROUTE+'api/notes/getAllNotes').then(
    (response)=> { console.log('success',response)},
    (response) => {
      console.log('error',response);
    }
  );

  $scope.addNewNote = () => {
      // $http.post(configs.API_ROUTE+'api/notes/createNewNote', $scope.newNote).then(
      //   (response)=> {
      //     console.log('success',response);
      //     $scope.newNote = {};
      // },
      //   (response) => {
      //     console.log('error',response);
      //   }
      // );
      $scope.newNote.id = $scope.MyNotes.length+1;
      $scope.MyNotes.push($scope.newNote);
      $rootScope.Notes = $scope.MyNotes;
      $scope.newNote = {};
      $scope.modalCreate.hide();
      console.log('rootscope',$rootScope.Notes);
  }
  var ipObj1 = {
    callback: function (val) {  //Mandatory 
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
      }
      $scope.newNote.dueDate = convertDate(new Date(val));
    },
    from: new Date(2012, 1, 1), //Optional 
    to: new Date(2500, 10, 30), //Optional 
    inputDate: new Date(),      //Optional 
    mondayFirst: true,          //Optional 
    disableWeekdays: [0],       //Optional 
    closeOnSelect: false,       //Optional 
    templateType: 'popup'       //Optional 
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };
  $scope.ViewDetails = (note) => {
    $scope.noteToUpdate = note;
    $scope.openModalDetails();
    console.log('rootscope',$rootScope.Notes);
    
  }

  $scope.deleteNote = () => {
    $scope.MyNotes  = _.without($scope.MyNotes, $scope.noteToUpdate);
    $rootScope.Notes =  $scope.MyNotes;
    console.log('rootscope',$rootScope.Notes);

  }

  $ionicModal.fromTemplateUrl('templates/createNote.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
  });
  $scope.openModalCreate = function() {
    $scope.modalCreate.show();
  };
  $scope.closeModalCreate = function() {
    $scope.modalCreate.hide();
  };

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




}
