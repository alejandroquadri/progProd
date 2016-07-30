angular.module('ProgProd')

.controller('Entregas', function($scope, gSS, $window){
  console.log('arranca controlador Entregas');
  $scope.datos = gSS.dataSS

  var semanaActual = (new Date()).getWeek()
  $scope.semanas = [semanaActual, semanaActual + 1, semanaActual + 2, semanaActual + 3]
  $scope.items = Object.keys($scope.datos)

  $scope.print = function(){
   var table = document.getElementById('printArea').innerHTML;
   var myWindow = $window.open('', '', 'width=800, height=600');
   myWindow.document.write(table);
   myWindow.print();
  };

})
