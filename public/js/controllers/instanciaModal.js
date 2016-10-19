angular.module('ProgProd')
.controller('InstanciaModal', function ($scope, $uibModalInstance, modal) {
  var fecha = modal.fecha.date.format("YYYYMMDD");

  $scope.fecha = modal.fecha;
  $scope.data = modal.data;
  $scope.dataForm = modal.dataForm;

  $scope.nuevos = [];
  $scope.pasar = [];

  $scope.submit = function () {
    $scope.nuevos.push({
      maquina: this.maquina,
      codigo: this.codigo.codigo,
      valor: this.cantidad,
      unidad:this.unidad
    });
    $scope.pasar.push({
      maquina: this.maquina,
      codigo: this.codigo.codigo,
      valor: this.cantidad,
      unidad:this.unidad,
      obj: this.codigo
    });
    this.maquina = "";
    this.codigo = "";
    this.cantidad = "";
    $scope.form.$setPristine();
  };

  $scope.ok = function (){
    $uibModalInstance.close($scope.pasar);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
