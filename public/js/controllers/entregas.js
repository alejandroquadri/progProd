angular.module('ProgProd')

.controller('Entregas', function($scope, googleSsData, googleAuth){

  $scope.cargaEntProg = false;

  $scope.autorizado = googleAuth.autorizado;

  googleSsData.cargaEntProg().then(function(res){
    console.log('data', res);
    $scope.datos = res;
    $scope.items = Object.keys($scope.datos);
    $scope.entregasProg = true;
  });

  // var semanaActual = (new Date()).getWeek();
  // $scope.semanas = [semanaActual, semanaActual + 1, semanaActual + 2, semanaActual + 3];

  var now = new Date();
  var semanas = [];

  for (var i=0; i < 4; i++) {
    var aSumar = 0;
    if (i!==0){ aSumar = 7; }
    now.setDate(now.getDate()+aSumar);
    var semana = now.getWeekYear()+""+now.getWeek();
    semanas.push(semana);
  }
  console.log(semanas);
  $scope.semanas = semanas;

  googleSsData.cargaEnProceso().then(function(res){
    $scope.dataEnProceso = res;
    $scope.enProceso = true;
  });

});
