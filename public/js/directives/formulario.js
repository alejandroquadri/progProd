angular.module('ProgProd')

.directive('formulario', function () {
  return {
    restrict: "E",
    templateUrl: "../templates/formulario.html",
    scope: {
        datos: "=",
        visible: "=",
        input: "@",
        output: "&",
        update: "&",
        ocultar: "&"
    },
    link: function(scope) {
      scope.dataForm = JSON.parse(scope.input);

      // esto es para que ya quede en el ng model el objeto codigo como deberia ser.
      scope.datos.codigo = scope.dataForm.items[0];

      scope.submit = function () {
        if (!scope.visible.update) {
          scope.output({data: {
            fecha: scope.datos.fecha,
            maquina: scope.datos.maquina,
            codigo: scope.datos.codigo.codigo,
            descripcion: scope.datos.codigo.descripcion,
            valor: scope.datos.cantidad,
            unidad:scope.datos.unidad,
            observacion:scope.datos.observacion
          }});

          // this.fecha = "";
          scope.datos.maquina = "";
          scope.datos.codigo.codigo = "";
          scope.datos.codigo.descripcion = "";
          scope.datos.cantidad = "";
          scope.datos.unidad = "";
          scope.datos.observacion = "";
          scope.form.$setPristine();
        } else if (scope.visible.update){
          scope.update({data:{
            fecha: scope.datos.fecha,
            maquina: scope.datos.maquina,
            codigo: scope.datos.codigo.codigo,
            descripcion: scope.datos.codigo.descripcion,
            valor: scope.datos.cantidad,
            unidad:scope.datos.unidad,
            observacion:scope.datos.observacion
          }});
        }
      };

      scope.mandaUpdate = function(){
        scope.update({data:{
          fecha: scope.datos.fecha,
          maquina: scope.datos.maquina,
          codigo: scope.datos.codigo.codigo,
          descripcion: scope.datos.codigo.descripcion,
          valor: scope.datos.cantidad,
          unidad:scope.datos.unidad,
          observacion:scope.datos.observacion
        }});
      };

    }
  };
});
