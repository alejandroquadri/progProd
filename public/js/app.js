
angular.module('ProgProd',['ui.router','ui.bootstrap','firebase'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/calendario')

  $stateProvider
  .state('calendario',{
    url:'/calendario',
    templateUrl:'templates/calendar.html',
    resolve:{

    },
    controller: 'Calendario',
    controllerAs:'ctrlCal'
  })
});
