
angular.module('ProgProd',['ui.router','ui.bootstrap','firebase'])

.constant("Constants", {
        //CLIENT_ID : '555150682260-2kpu5ahoc78ph1vjs9juhmrl9fbm8u67.apps.googleusercontent.com', //esta funciona para localhost 8000
        CLIENT_ID : '555150682260-mvj2a3esh23118k4aekt9fni7738ukdo.apps.googleusercontent.com', //esta funciona para firebase
        SCOPES : ["https://www.googleapis.com/auth/spreadsheets.readonly"]
})

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
          entregasSS: function ($window, googleAuth, $q) {
            var defer = $q.defer();
            $window.init= function() {
              googleAuth.checkAuth()
              .then(function(res){
                console.log('api cargado');
                defer.resolve();
              })
            };
            return defer.promise;
          }

        }
      }
    }
    // ** el resolve, puede it tanto afuera como adentro. Calculo que sera por si se quiere resolver algo para varias vistas
  })
});
