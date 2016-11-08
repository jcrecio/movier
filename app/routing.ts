angular
  .module('movier')
  .config(function ($stateProvider) {
      $stateProvider
        .state('main', {
            url:'/',
            templateUrl: 'main.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
        .state('bookmarks', {
            url: '/bookmarks',
            templateUrl: 'bookmarks.component.html',
            controller: 'BookmarksController',
            controllerAs: 'vm',
        });
  });