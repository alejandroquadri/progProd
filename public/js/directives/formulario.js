angular.module('ProgProd')

.directive('formulario', function () {
  return {
    restrict: "E",
    templateUrl: "../templates/formulario.html",
    scope: {
        datos: "=",
        config: "=",
        input: "@",
        output: "&",
        ocultar: "&"
    },
    link: function(scope) {
      scope.dataForm = JSON.parse(scope.input);

      // esto es para que ya quede en el ng model el objeto codigo como deberia ser.
      scope.datos.item = scope.dataForm.items[0];

      scope.submit = function () {

        // scope.output({data: {
        //   fecha: scope.datos.fecha,
        //   maquina: scope.datos.maquina,
        //   codigo: scope.datos.codigo.codigo,
        //   descripcion: scope.datos.codigo.descripcion,
        //   valor: scope.datos.cantidad,
        //   unidad:scope.datos.unidad,
        //   observacion:scope.datos.observacion
        // }});

        scope.output({data: this});
      };

    }
  };
});
