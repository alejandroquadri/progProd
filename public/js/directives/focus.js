angular.module('ProgProd')

.directive('focus', function () {
  return {
    restrict: 'A',
    link: function (scope, elem) {

      elem.on('submit', function () {
        var primero = angular.element(document.querySelector('#maquina'))
        primero.focus();
      })
    }
  };
});
