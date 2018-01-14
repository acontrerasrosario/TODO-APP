<<<<<<< HEAD
angular.module("TodoAppIntec")
// Addig the  controller function
// to the context module
.controller('AboutUsCtrl', AboutUsCtrl);
AboutUsCtrl.$inject = ['$scope', 'AboutUsServ', '$ionicModal'];
function AboutUsCtrl($scope, people, $ionicModal) {
$scope.message = "work";
$scope.members = people.all();

console.log('klk');
function  listClick(event, newValue) {
console.log(newValue);
this.selectedItem = newValue;  // don't forget to update the model here
// ... do other stuff here ...}
};
console.log('klk');

$ionicModal.fromTemplateUrl('templates/modal.html', {
scope: $scope
}).then(function(modal) {
$scope.modal = modal;
});

$scope.clicker = function(item){
    $scope.klk = item;
  $scope.modal.show();
};




}
=======
// Getting the Context Module
    angular.module("TodoAppIntec")
        // Addig the  controller function
        // to the context module
        .controller('AboutUsCtrl', AboutUsCtrl);
    AboutUsCtrl.$inject = ['$scope', 'AboutUsServ'];
    function AboutUsCtrl($scope, people) {
        $scope.message = "work";
        $scope.members = people.all();
        var s= '';
    }
>>>>>>> origin/BRAWNY
