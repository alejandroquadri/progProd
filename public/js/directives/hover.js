angular.module('ProgProd')

.directive('hover', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      $(element).hover(
        function () {
            $(this).find('span.eliminar').css('visibility','visible');//.addClass('hovering');
            $(this).find('span.update').css('visibility','visible');
        },
        function () {
            $(this).find('span.eliminar').css('visibility','hidden');//.removeClass('hovering');
            $(this).find('span.update').css('visibility','hidden');
        }
      );
    }
  };
});
