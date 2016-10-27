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

      scope.submit = function () {
        scope.output({data: this});
      };

    }
  };
});
