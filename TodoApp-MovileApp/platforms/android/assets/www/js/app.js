// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('TodoAppIntec', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers['Access-Control-Allow-Origin'] = '*';
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller:'DashCtrl'
      }
    }
  })

  .state('tab.notes', {
      url: '/notes',
      views: {
        'tab-notes': {
          templateUrl: 'templates/tab-notes.html',
          controller:'NotesCtrl'
        }
      }
    })

  .state('tab.notesGroups', {
    url: '/notesGroups',
    views: {
      'tab-notesGroups': {
        templateUrl: 'templates/tab-notesGroups.html',
        controller:'NotesGroupsCtrl'
      }
    }
  })

  .state('tab.aboutUs', {
    url: '/aboutUs',
    views: {
      'tab-aboutUs': {
        templateUrl: 'templates/tab-aboutUs.html',
        controller:'AboutUsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
