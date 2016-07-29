
angular.module('ProgProd',['ui.router','ui.bootstrap','firebase'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/calendario')

  $stateProvider
  .state('calendario',{
    url:'/calendario',
    views: {
      'calendario':{
        templateUrl:'templates/calendar.html',
        controller: 'Calendario',
        controllerAs:'ctrlCal',
        resolve:{
          base: function () {
            console.log('resolveCalendario');
            return firebase.database().ref('programa')
          }
        }
      },
      'entregas':{
        templateUrl:'templates/entregas.html',
        controller: 'Entregas',
        controllerAs:'ctrlEnt',
        resolve:{
          entregasSS: function (gSS, $q) {
            return $q(function(resolve, reject) {
              gSS.carga().then(function(){
                resolve();
              })
            })
          }
        }
      }
    }
    // ** el resolve, puede it tanto afuera como adentro. Calculo que sera por si se quiere resolver algo para varias vistas
  })
});
