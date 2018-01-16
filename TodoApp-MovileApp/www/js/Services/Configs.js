(function () {
    'use strict';

    angular
        .module('TodoAppIntec')
        .factory('Configs', factory);

    factory.$inject = ['$http'];

    function factory($http) {
      this.API_ROUTE = 'http://todoapp-intec.azurewebsites.net';
        var l = 's';



        return this;
    }
})();
