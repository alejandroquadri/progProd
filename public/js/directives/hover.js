angular.module('ProgProd')

.directive('hover', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      $(element).hover(
        function () {
            $(this).find('span.eliminar').css('visibility','visible')//.addClass('hovering');
            console.log('agregado');
        },
        function () {
            $(this).find('span.eliminar').css('visibility','hidden')//.removeClass('hovering');
            console.log('removido');
        }
      );
    }
  }
})
