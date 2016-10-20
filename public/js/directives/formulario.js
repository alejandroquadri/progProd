angular.module('ProgProd')

.directive('formulario', function () {
  return {
    restrict: "E",
    templateUrl: "../templates/formulario.html",
    scope: {
        datos: "=",
        input: "@",
        output: "&",
        ocultar: "&"
    },
    link: function(scope) {
      scope.dataForm = JSON.parse(scope.input);

      scope.submit = function () {
        scope.output({data: {
          fecha: scope.datos.fecha,
          maquina: scope.datos.maquina,
          codigo: scope.datos.codigo.codigo,
          valor: scope.datos.cantidad,
          unidad:scope.datos.unidad,
          observacion:scope.datos.observacion
        }});

        // this.fecha = "";
        scope.datos.maquina = "";
        scope.datos.codigo = "";
        scope.datos.cantidad = "";
        scope.datos.unidad = "";
        scope.datos.observacion = "";
        scope.form.$setPristine();

      };
      scope.mandarlo = function(){
        console.log('anda mandarlo');
        scope.output({message:'Comentario'});
      };


    }
  };
});
