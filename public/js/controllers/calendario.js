angular.module('ProgProd')

.controller('Calendario', function($scope, $firebaseObject, $firebaseArray, base, dataForm){

  var baseSync = $firebaseObject(base);
  baseSync.$loaded()
  .then(function(){
    $scope.data = baseSync;
  });

  $scope.nada = "";

  $scope.JSONdataForm = JSON.stringify(dataForm);

  $scope.config = {
    formulario: false,
    nuevo: true,
    update: false
  };

  $scope.datos = {
    fecha: new Date(),
    maquina: "",
    item: "",
    cantidad: "",
    unidad:"",
    observacion: ""
  };

  $scope.ocultar = function(){
    $scope.config.formulario = false;
  };

  $scope.nuevo = function(fecha){
    $scope.config.update = false;
    $scope.config.nuevo = true;
    $scope.config.formulario = true;


    $scope.datos.fecha = fecha.date._d;
    $scope.datos.maquina = '';
    $scope.datos.item = '';
    $scope.datos.cantidad = '';
    $scope.datos.unidad = '';
    $scope.datos.observacion = '';
  };

  $scope.openUpdate = function (fecha, maquina, codigo, index, valor){

    var fechaFor = fecha.format('YYYYMMDD');

    $scope.config.configUpdate = {
      index: index,
      fecha: fecha,
      maquina: maquina,
    };

    $scope.config.update = true;
    $scope.config.nuevo = false;
    $scope.config.formulario = true;

    $scope.datos.fecha = fecha._d;
    $scope.datos.maquina = maquina;
    $scope.datos.item = codigo;
    $scope.datos.cantidad = valor.valor;
    $scope.datos.unidad = valor.unidad;
    $scope.datos.observacion = valor.observacion;

  };

  $scope.output = function(data){
    //console.log(data.datos);

    if ($scope.config.nuevo) {
      console.log('nuevo');
      save(data.datos);
    }

    if ($scope.config.update){
      console.log('update');
      update(data.datos);
    }
  };

  function save(data) {
    console.log('corre save');
    // lo conveirto ayudandome con la biblioteca moment al formato YYYYMMDD
    var fechaF = moment(data.fecha).format("YYYYMMDD");

    var nuevo = {
      codigo: data.item,
      valor: data.cantidad || "",
      unidad: data.unidad || "",
      observacion: data.observacion || ""
    };
    //base.child(fechaF+'/'+data.maquina).push(nuevo);

    var list = $firebaseArray(base.child(fechaF+'/'+data.maquina));
    list.$add(nuevo)
    .then(function(item){
      console.log('guardado');
      if($scope.config.update){
        console.log('actualiza datos');
        $scope.config.configUpdate.fecha = moment(data.fecha);
        $scope.config.configUpdate.maquina = data.maquina;
        $scope.config.configUpdate.index = list.$indexFor(item.key);
      }
      list.$destroy();
    })
    .then( function(){
      console.log('destruido list');
    });
  }

  $scope.eliminar = function (fecha, maquina, codigo, index, valor){
    console.log('ret',fecha, maquina, codigo, index, valor);
    var arreglo = $firebaseArray(base.child(fecha+'/'+maquina));
    console.log('arreglo', arreglo);

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

  function update(data){
    console.log('corre update');
    var fechaFor = $scope.config.configUpdate.fecha.format('YYYYMMDD');
    // var fechaFor = moment(data.fecha).format("YYYYMMDD");

    var arreglo = $firebaseArray(base.child(fechaFor+'/'+$scope.config.configUpdate.maquina));

    arreglo.$loaded()
    .then(function(){
      var item = arreglo[$scope.config.configUpdate.index];
      //console.log('item', item);
      return item;
    })
    .then(function(item){
      arreglo.$remove(item);
    })
    .then(function(){
      console.log('borrado');
      arreglo.$destroy();
    })
    .then(function(){
      console.log('desincronizado');
      save(data);
    });
  }

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

});
