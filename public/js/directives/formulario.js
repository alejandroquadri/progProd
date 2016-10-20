angular.module('ProgProd')

.directive('formulario', function () {
  return {
    restrict: "E",
    templateUrl: "../templates/formulario.html",
    scope: {
        fecha: "=",
        input: "@",
        output: "&"
    },
    link: function(scope) {
      scope.dataForm = JSON.parse(scope.input);

      scope.submit = function () {
        scope.output({data: {
          maquina: this.maquina,
          codigo: this.codigo.codigo,
          valor: this.cantidad,
          unidad:this.unidad,
          observacion:this.observacion
        }});

        this.maquina = "";
        this.codigo = "";
        this.cantidad = "";
        this.unidad = "";
        this.observacion = "";
        scope.form.$setPristine();

      };
      scope.mandarlo = function(){
        console.log('anda mandarlo');
        scope.output({message:'Comentario'});
      };


    }
  };
});
