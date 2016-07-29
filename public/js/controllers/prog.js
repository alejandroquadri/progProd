angular.module('ProgProd')

.controller('ProgController', function($scope, $http){

  $scope.bajada = function (){
    console.log('bajada');
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1K6oG_mpR2Cb8YXtTw3LjVg0T0QnSscoHhYWB8xz8Ph0',
      range: 'Base!A1:AZ',
    }).then(function(response) {

        console.log('dsps promesa',response.result);
        $scope.datos = response.result;
        $scope.$apply();
        console.log('scope',$scope.datos);

      });
  }

  $scope.day = moment();

})
