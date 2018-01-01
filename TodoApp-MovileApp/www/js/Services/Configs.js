(function () {
    'use strict';

    angular
        .module('TodoAppIntec')
        .factory('Configs', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        this.API_ROUTE = 'https://todoapp-intec.azurewebsites.net/';




        return this;
    }
})();
