angular.module('ProgProd')

.factory('googleAuth', function(Constants, $window, $q){
  var o = {};

  o.autorizado = false;

  o.checkAuth = function(){
    var defer = $q.defer();
    if(o.autorizado){defer.resolve();}
    gapi.auth.authorize(
      {
        'client_id': Constants.CLIENT_ID,
        'scope': Constants.SCOPES.join(' '),
        'immediate': true
      }).then(
        function(res){
          o.autorizado = true;
          var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
          gapi.client.load(discoveryUrl).
          then(function(){
            defer.resolve();
          });
      }, function(){
          o.askAuth()
          .then(function(){
            defer.resolve();
          });
      });
    return defer.promise;
  };

  o.askAuth = function(){
    var defer = $q.defer();
    gapi.auth.authorize({client_id: Constants.CLIENT_ID, scope: Constants.SCOPES, immediate: false}, function(){
      console.log('volvio auth');
      o.autorizado = true;
      defer.resolve();
      $window.location.reload();
    });
    return defer.promise;
  };

  return o;

})

.factory('googleSsData', function(googleAuth, $q){

  var o = {};

  o.cargaEntProg = function(){
    var defer = $q.defer();
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1K6oG_mpR2Cb8YXtTw3LjVg0T0QnSscoHhYWB8xz8Ph0',
      range: 'Programador!A1:AZ'
    }).then(function(response) {
      var data = sumaSemana(response.result.values);
      defer.resolve(data);
    });

    return defer.promise;
  };

  o.cargaEnProceso = function(){
    var defer = $q.defer();
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '12Mywtm_OS33JQsLYQNnFub2pJ29RQGMesC6yE7Gplio',
      range: 'Expo!A:B'
    }).then(function(response) {
      var data = response.result.values;
      //console.log(data);
      defer.resolve(data);
    });

    return defer.promise;
  };

  Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  function sumaSemana(datos){
    //var datos = $scope.dataSS;
    var titulos = datos[0];

    var artXSem = {};

    for (var i = 1 ; i < datos.length ; i++ ) {
      // console.log('****** --- '+i+' ---- ******');
      for (var j = 7; j< datos[0].length ; j++ ) {
        var valor = datos[i][j];

        if (valor === "" || !valor) {continue;}
        valor = parseFloat(datos[i][j].replace(/,/g, '.'));
        if (valor >= 0) {continue;}
        var fechaString = titulos[j];

        var fecha = new Date();
        fecha.setDate(fechaString.substring(5, 7));
        fecha.setMonth(fechaString.substring(8, 10)-1);

        if (!(datos[i][3] in artXSem)) {
          artXSem[datos[i][3]] = {};
          if (!(fecha.getWeek() in artXSem[datos[i][3]])){
            artXSem[datos[i][3]][fecha.getWeek()] = Math.abs(valor);
          } else { artXSem[datos[i][3]][fecha.getWeek()] += Math.abs(valor);}
        } else  {
          if (!(fecha.getWeek() in artXSem[datos[i][3]])){
            artXSem[datos[i][3]][fecha.getWeek()] = Math.abs(valor);
          } else { artXSem[datos[i][3]][fecha.getWeek()] += Math.abs(valor);}
        }
      }
    }
    // console.log(artXSem);
    return artXSem;
  }

  return o;
});
