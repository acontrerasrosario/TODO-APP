// Getting the Context Module
angular.module("TodoAppIntec")
  // Addig the  controller function
  // to the context module
  .controller('NotesCtrl', NotesCtrl);
NotesCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal','$http', 'Configs', '$rootScope','ionicDatePicker','AuthService','$state'];
function NotesCtrl($scope, people, $ionicModal,$http,configs,$rootScope,ionicDatePicker,AuthService,$state) {
  if (!AuthService.User.isAuthenticated)
  //          $state.go('login', {}, {reload: true});

  $scope.newNote = {
            "title":null,
            "description":null,
            "type":"0",
            "dueDate":null,
            "colorHex":null,
            "remindMe":1,
            "tagId":null,
        }

  $scope.MyNotes= [];
  $scope.MyTags = [];

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
        
  $http.get(configs.API_ROUTE+'api/notes/getAllNotes').then(
    (response)=> { 
      console.log('getAllNotes Success',response)
      arregloFix = response.data;
      arregloFix.forEach(element => {
        var date = new Date(element.dueDate);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        element.dueDate = day + '/' + (monthIndex+1) + '/' + year;
      });
      $scope.MyNotes = arregloFix;
      $rootScope.Notes = $scope.MyNotes; 
    },
    (response) => {
      console.log('getAllNotes Error',response);
    }
  );

  $scope.addNewNote = () => {
    var required_values = {
      "title": 'Titulo',
      "description": 'Descripcion',
      "type": "Tipo",
      "dueDate": 'Fecha',
      "color": 'Color',
    };
    var missing = [];
    var missingmsj = '';
    for (var i in required_values) {
      if ($scope.newNote[i] == null) {
        missing.push(i);
        missingmsj += `\n "${required_values[i]}" es un valor requerido. </br>`
      }
    }
    if (missing.length > 0) {
      $scope.modalCreate.hide();
      var myPopup = $ionicPopup.show({
        title: 'Error',
        subTitle: missingmsj,
        scope: $scope,
        buttons: [
          { text: 'Ok' },
        ]
      });
    } else {
      $ionicLoading.show({
        template: '<p>Creando cuenta...</p><ion-spinner></ion-spinner>'
      });
      $scope.newNote.id = $scope.MyNotes.length + 1;
      $scope.MyNotes.push($scope.newNote);
      $rootScope.Notes = $scope.MyNotes;
      $scope.newNote = {};
      $scope.modalCreate.hide();
      $ionicLoading.hide();
    }

    
    $http.post(configs.API_ROUTE+'api/notes/createNewNote', $scope.newNote).then(
        (response)=> {
          console.log('AddNewNote success',response);
          var date = new Date(response.data.dueDate);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          response.data.dueDate = day + '/' + (monthIndex+1) + '/' + year;
          $scope.MyNotes.push(response.data);
          $scope.newNote = {};
          $rootScope.Notes = $scope.MyNotes;
      },
        (response) => {
          console.log('AddNewNote error',response);
        }
      );
  }
  var ipObj1 = {
    callback: function (val) {  //Mandatory 
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
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

  var ipObj2 = {
    callback: function (val) {  //Mandatory 
      console.log('Return value from the datepicker popup is : ' + val, new Date($scope.noteToUpdate.dueDate));
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
      }
      $scope.noteToUpdate.dueDate = convertDate(new Date(val));
    },
    from: new Date(2012, 1, 1), //Optional 
    to: new Date(2500, 10, 30), //Optional 
    inputDate: new Date($scope.newNote.dueDate),      //Optional 
    mondayFirst: true,          //Optional 
    disableWeekdays: [0],       //Optional 
    closeOnSelect: false,       //Optional 
    templateType: 'popup'       //Optional 
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.openDatePicker2 = function(){
    ionicDatePicker.openDatePicker(ipObj2);
  };

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
    console.log('rootscope', $rootScope.Notes);

  }

  $scope.updateNote = () => {
    $http.put(configs.API_ROUTE+'api/notes/UpdateNote', $scope.noteToUpdate).then(
      (response)=> {
        console.log('updateNote success',response);
        $scope.MyNotes = [];
        $scope.MyNotes = response.data;
        $rootScope.Notes = $scope.MyNotes;
    },
      (response) => {
        console.log('updateNote error',response);
      }
    );
  }
  
  $scope.deleteNote = () => {
    var noteIdToDelete = $scope.noteToUpdate.noteID;
    $http.delete(configs.API_ROUTE+'api/notes/deleteNote?noteID='+ noteIdToDelete).then(
      (response)=> {
        console.log('deleteNote success',response);
        $scope.MyNotes  = _.without($scope.MyNotes, $scope.noteToUpdate);
        $rootScope.Notes =  $scope.MyNotes;
    },
      (response) => {
        console.log('deleteNote error',response);
      }
    );
    
  }

  $ionicModal.fromTemplateUrl('templates/createNote.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalCreate = modal;
  });
  $scope.openModalCreate = function() {
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
    $scope.modalCreate.show();
  };
  $scope.closeModalCreate = function () {
    $scope.modalCreate.hide();
  };

  $ionicModal.fromTemplateUrl('templates/ViewDetails.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalDetails = modal;
  });
  $scope.openModalDetails = function () {
    $scope.modalDetails.show();
  };
  $scope.closeModalDetails = function () {
    $scope.modalDetails.hide();
  };


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


}
