angular.module('ProgProd')

.controller('Calendario', function($scope, $uibModal, $firebaseObject, $firebaseArray, base, dataForm){
  var baseSync = $firebaseObject(base);
  baseSync.$loaded()
  .then(function(){
    $scope.data = baseSync;
    //console.log('Sincronizado con $scope.data', $scope.data);
  });

  $scope.nada = "";

  $scope.selected = _removeTime($scope.selected || moment());
  $scope.month = $scope.selected.clone();

  var start = $scope.selected.clone();
  start.date(1);
  _removeTime(start.day(0));
  _buildMonth($scope, start, $scope.month);

  $scope.select = function(day) {
      $scope.selected = day.date;
  };

  $scope.next = function() {
      var next = $scope.month.clone();
      _removeTime(next.month(next.month()+1).date(1));
      $scope.month.month($scope.month.month()+1);
      _buildMonth($scope, next, $scope.month);
  };

  $scope.previous = function() {
      var previous = $scope.month.clone();
      _removeTime(previous.month(previous.month()-1).date(1));
      $scope.month.month($scope.month.month()-1);
      _buildMonth($scope, previous, $scope.month);
  };

  function _removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth($scope, start, month) {
      $scope.weeks = [];
      var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
      while (!done) {
          $scope.weeks.push({ days: _buildWeek(date.clone(), month) });
          date.add(1, "w");
          done = count++ > 2 && monthIndex !== date.month();
          monthIndex = date.month();
      }
  }

  function _buildWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
          days.push({
              name: date.format("dd").substring(0, 1),
              number: date.date(),
              isCurrentMonth: date.month() === month.month(),
              isToday: date.isSame(new Date(), "day"),
              date: date
          });
          date = date.clone();
          date.add(1, "d");
      }
      return days;
  }

  $scope.animationsEnabled = true; //esto para que el modal tenga ese efecto que viene de arriba

  $scope.nuevo = function (fecha){

    $scope.selected = fecha.date;

    //este objeto lo uso para mandar datos al modal
     var modal = {
      fecha: fecha,
      data: $scope.data,
      dataForm: dataForm
    };

    //con esto abro el modal y mando la info que necesito
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templates/cargaProduccion.html',
      controller: 'InstanciaModal',
      size: 'lg',
      resolve: {
        modal: function () {
          return modal;
        }
      }
    });

    //con esta funcion digo que es lo que pasa con lo que vuelve del modal
    modalInstance.result.then(function (nuevos) {
      var fechaFormato = fecha.date.format("YYYYMMDD");

      for (var i=0; i < nuevos.length ; i ++) {
        var nuevo = {
          codigo: nuevos[i].codigo,
          valor: nuevos[i].valor || "",
          unidad: nuevos[i].unidad || "",
          descripcion: nuevos[i].obj.descripcion,
          fabricado: false
        };
        base.child(fechaFormato+'/'+nuevos[i].maquina).push(nuevo);
      }
    }, function (ret) { //esto se usa para definir que pasa cuando cancelo el modal
      console.log('dismissed');
    });
  };

  $scope.eliminar = function (fecha, maquina, codigo, index, valor){
    console.log('ret',fecha, maquina, codigo, index, valor);
    var arreglo = $firebaseArray(base.child(fecha+'/'+maquina));

    arreglo.$loaded().then(function(){
      var item = arreglo[index];
      return item;
    })
    .then(function(item){
      arreglo.$remove(item);
      console.log('borrado');
    })
    .then(function(){
      arreglo.$destroy();
    })
    .then(function(){
      console.log('desincronizado');
    });
  };
});
