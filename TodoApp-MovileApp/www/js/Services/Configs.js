(function () {
    'use strict';

    angular
        .module('TodoAppIntec')
        .factory('Configs', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        this.API_ROUTE = 'http://localhost:52521';




        return this;
    }
})();