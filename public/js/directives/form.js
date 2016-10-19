angular.module('ProgProd')

.directive('form', function () {
  return {
    restrict: "E",
    templateUrl: "../templates/form.html",
    scope: {
        selected: "="
    },
    link: function(scope) {
    }
  };
});
