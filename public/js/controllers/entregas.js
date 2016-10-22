angular.module('ProgProd')

.controller('Entregas', function($scope, googleSsData, googleAuth){

  $scope.cargaEntProg = false;

  $scope.autorizado = googleAuth.autorizado;

  googleSsData.cargaEntProg().then(function(res){
    $scope.datos = res;
    $scope.items = Object.keys($scope.datos);
    $scope.entregasProg = true;
  });

  var semanaActual = (new Date()).getWeek();
  $scope.semanas = [semanaActual, semanaActual + 1, semanaActual + 2, semanaActual + 3];

  googleSsData.cargaEnProceso().then(function(res){
    $scope.dataEnProceso = res;
    $scope.enProceso = true;
  });

});
