angular.module('ProgProd')

.controller('Entregas', function($scope, googleSsData, googleAuth){
  console.log('arranca controlador Entregas');

  $scope.cargaEntProg = false;

  $scope.autorizado = googleAuth.autorizado;
  console.log($scope.autorizado);

  googleSsData.cargaEntProg().then(function(res){
    $scope.datos = res;
    $scope.items = Object.keys($scope.datos);
    $scope.entregasProg = true;
  })

  var semanaActual = (new Date()).getWeek()
  $scope.semanas = [semanaActual, semanaActual + 1, semanaActual + 2, semanaActual + 3];

  googleSsData.cargaEnProceso().then(function(res){
    console.log(res);
    $scope.dataEnProceso = res;
    $scope.enProceso = true;
  })

})
