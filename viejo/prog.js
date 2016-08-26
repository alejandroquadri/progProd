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

  $http({
    method: 'GET',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/1K6oG_mpR2Cb8YXtTw3LjVg0T0QnSscoHhYWB8xz8Ph0/values/Base!A1:AZ'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  //$scope.day = moment();

})
