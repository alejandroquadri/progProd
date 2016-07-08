angular.module('ProgProd')
.controller('InstanciaModal', function ($scope, $uibModalInstance, modal) {
  var fecha = modal.fecha.date.format("YYYYMMDD");

  $scope.fecha = modal.fecha;
  $scope.data = modal.data;

  $scope.nuevos = []

  $scope.submit = function () {
    $scope.nuevos.push({
      maquina: this.maquina,
      codigo: this.codigo,
      valor: this.cantidad
    })
    this.maquina = "";
    this.codigo = "";
    this.cantidad = "";
    $scope.form.$setPristine();
  };

  $scope.ok = function (){
    $uibModalInstance.close($scope.nuevos);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
