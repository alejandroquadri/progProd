
angular.module('ProgProd',['ui.router','ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/calendario')

  $stateProvider
  .state('calendario',{
    url:'/calendario',
    templateUrl:'templates/calendar.html',
    controller: 'Calendario',
    controllerAs:'ctrlCal'
  })
});
