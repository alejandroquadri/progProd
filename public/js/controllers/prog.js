angular.module('ProgProd')

.controller('ProgController', function($scope, $http){

  $scope.bajada = function (){
    console.log('bajada');
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1141SH5sMcqhzrSI4XAUJdJ8A5jOjxeW9AWIz3IMTjco',
      range: 'Base!A1:D',
    }).then(function(response) {

        console.log('dsps promesa',response.result);
        $scope.datos = response.result;
        $scope.$apply();
        console.log('scope',$scope.datos);

      });
  }

  $scope.day = moment();

})
