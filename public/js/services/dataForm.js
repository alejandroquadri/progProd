angular.module('ProgProd')

  .factory('dataForm', function (){

    var o = {};

    o.items = [
      {codigo:'83ADRP324040', descripcion:'64 P Brechiato', unidad:'m2'},
      {codigo:'83ADRP114040', descripcion:'64 P Blanco', unidad:'m2'},
      {codigo:'83ADRP724040', descripcion:'64 P Blanco Espuma', unidad:'m2'},
      {codigo:'83ADRP104040', descripcion:'64 P Gris Perla', unidad:'m2'},
      {codigo:'83ADRP124040', descripcion:'64 P Sierra Chica', unidad:'m2'},
      {codigo:'83ADRP174040', descripcion:'64 P Verde Alpe', unidad:'m2'},
      {codigo:'83ADCP324040', descripcion:'Ad Curvo Brechiato', unidad:'m2'},
      {codigo:'1010S   4040', descripcion:'Mosaico Gris Perla', unidad:'m2'},
      {codigo:'1111S   4040', descripcion:'Mosaico Blanco', unidad:'m2'},
      {codigo:'1716S   4040', descripcion:'Mosaico Verde Alpe', unidad:'m2'},
      {codigo:'1733W   4040', descripcion:'Mosaico Sierra Chica', unidad:'m2'},
      {codigo:'2615S   4040', descripcion:'Mosaico Napoleon', unidad:'m2'},
      {codigo:'2717S   4040', descripcion:'Mosaico Botichino', unidad:'m2'},
      {codigo:'3210S   4040', descripcion:'Mosaico Brechiato', unidad:'m2'},
      {codigo:'801010KL4040', descripcion:'Loseta cemento 40', unidad:'m2'},
      {codigo:'801010KL6040', descripcion:'Loseta cemento 60', unidad:'m2'},
      {codigo:'801010SL6040', descripcion:'Loseta Gris Perla 60', unidad:'m2'},
      {codigo:'801011SS6040', descripcion:'Loseta Blanca 60', unidad:'m2'},
      {codigo:'803210SS6040', descripcion:'Loseta Brechiato 60', unidad:'m2'},
      {codigo:'801716S6040', descripcion:'Loseta Verde Alpe 60', unidad:'m2'},
      {codigo:'83CEK35 4040.48', descripcion:'Tresbolillo', unidad:'m2'},
      {codigo:'1011SB  1040', descripcion:'Zocalos Blanco Espuma', unidad:'ml'},
      {codigo:'1111SB  1040', descripcion:'Zocalos Blanco', unidad:'ml'},
      {codigo:'2717SB  1040', descripcion:'Zocalos Botichino', unidad:'ml'},
      {codigo:'3210SB  1040', descripcion:'Zocalos Brechiato', unidad:'ml'},
      {codigo:'1010SB  1040', descripcion:'Zocalos Gris Perla', unidad:'ml'},
      {codigo:'2615CB  1040', descripcion:'Zocalos Napoleon', unidad:'ml'},
      {codigo:'1733WB  1040', descripcion:'Zocalos Sierra Chica', unidad:'ml'},
      {codigo:'0020    10', descripcion:'Pastina Gris', unidad:'bolsa'},
      {codigo:'0020    11', descripcion:'Pastina Blanca', unidad:'bolsa'},
      {codigo:'0020    12', descripcion:'Pastina Roja', unidad:'bolsa'},
      {codigo:'0020    15', descripcion:'Pastina Napoleon', unidad:'bolsa'},
      {codigo:'0020    16', descripcion:'Pastina Negra', unidad:'bolsa'},
      {codigo:'0020    17', descripcion:'Pastina Marfil', unidad:'bolsa'},
      {codigo:'9BE1017P5050', descripcion:'Esquinero pileta', unidad:'unidad'},
      {codigo:'9BP1017P5050', descripcion:'Placa pileta', unidad:'m2'},
      {codigo:'9BL1017P4050', descripcion:'Borde pileta', unidad:'ml'},
      {codigo:'9BRE1017P2550', descripcion:'Rejilla pileta', unidad:'unidad'},
      {codigo:'9J1010K3030', descripcion:'Bloque jardin', unidad:'m2'},
      {codigo:'83RUS16 4040', descripcion:'Rustico Negro', unidad:'m2'},
      {codigo:'83RUS12 4040', descripcion:'Rustico Rojo', unidad:'m2'},
      {codigo:'83RUS10 4040', descripcion:'Rustico Gris', unidad:'m2'},
      {codigo:'Mosaico 50x50', descripcion:'Mosaico 50x50', unidad:'m2'}
    ];

    o.maquinas = [
      '1440',
      '650',
      'Breton',
      'Lineal',
      'Biseladora',
      'Desbañadora',
      'Cortadora',
      'Otro',
      'Pastinas',
      'Granalladora',
      'Molde',
      'Escalera'
    ];

    o.unidades = [
      '',
      'litros',
      'ml',
      'unidad',
      'm2',
      'kg',
      'bolsa'
    ];

    return o;

  });
