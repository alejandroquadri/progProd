angular.module('ProgProd')

.controller('Entregas', function($scope, gSS){
  console.log('arranca controlador Entregas');
  $scope.datos = gSS.dataSS

  var semanaActual = (new Date()).getWeek()
  $scope.semanas = [semanaActual, semanaActual + 1, semanaActual + 2, semanaActual + 3]
  $scope.items = Object.keys($scope.datos)


})
