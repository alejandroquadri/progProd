angular.module('ProgProd')

.controller('Calendario', function($scope, $firebaseObject, $firebaseArray, base, dataForm){

  var baseSync = $firebaseObject(base);
  baseSync.$loaded()
  .then(function(){
    $scope.data = baseSync;
  });

  $scope.JSONdataForm = JSON.stringify(dataForm);

  $scope.visible = {
    formulario: false,
    agregar: true,
    update: false
  };

  $scope.datos = {
    fecha: new Date(),
    maquina: "",
    codigo: {
      codigo: "",
      descripcion:"",
      unidad:""
    },
    cantidad: "",
    unidad:"",
    observacion: ""
  };

  $scope.nada = "";

  $scope.nuevo = function(fecha){
    $scope.visible.update = false;
    $scope.visible.agregar = true;
    $scope.visible.formulario = true;
    $scope.datos.fecha = fecha.date._d;
    $scope.datos.maquina = '';
    $scope.datos.codigo.codigo = '';
    $scope.datos.codigo.descripcion = '';
    $scope.datos.cantidad = '';
    $scope.datos.unidad = '';
    $scope.datos.observacion = '';
  };

  $scope.ocultar = function(){
    $scope.visible.formulario = false;
  };

  $scope.save = function (data) {
    console.log(data);
    // lo conveirto ayudandome con la biblioteca moment al formato YYYYMMDD
    var fechaF = moment(data.fecha).format("YYYYMMDD");
    // cambio el atributo fecha en el obejto para poderlo guardar
    data.fecha = fechaF;

    console.log('valor', data.valor);

    var nuevo = {
      codigo: data.codigo,
      descripcion: data.descripcion,
      valor: data.valor || "",
      unidad: data.unidad || "",
      observacion: data.observacion || ""
    };
    console.log('data', data);
    console.log('nuevo', nuevo);
    base.child(data.fecha+'/'+data.maquina).push(nuevo);

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

  $scope.openUpdate = function (fecha, maquina, codigo, index, valor){
    //console.log('ret',fecha, maquina, codigo, index, valor);

    var fechaFor = fecha.format('YYYYMMDD');

    $scope.modificar = {
      index: index,
      fecha: fecha,
      maquina: maquina,
      itemViejo: valor
    };

    $scope.visible.update = true;
    $scope.visible.agregar = false;
    $scope.visible.formulario = true;

    $scope.datos.fecha = fecha._d;
    $scope.datos.maquina = maquina;
    $scope.datos.codigo.codigo = valor.codigo;
    $scope.datos.codigo.descripcion = valor.descripcion;
    $scope.datos.cantidad = valor.valor;
    $scope.datos.unidad = valor.unidad;

  };

  $scope.update = function(data){
    console.log('corre update');
    var fechaFor = $scope.modificar.fecha.format('YYYYMMDD');
    var arreglo = $firebaseArray(base.child(fechaFor+'/'+$scope.modificar.maquina));

    arreglo.$loaded()
    .then(function(){
      var item = arreglo[$scope.modificar.index];
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
      $scope.save(data);
    });
  };

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
