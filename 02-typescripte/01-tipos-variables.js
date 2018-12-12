//  01-tipos-variables.ts
// DUCK TYPING -> DUCK
var nombre = 'Adrian';
nombre = '1';
nombre = [];
var edad = 21.2;
edad = '12';
var casado = false;
casado = true;
casado = null;
casado = undefined;
var arregloNumeros = [1, 2, 3];
arregloNumeros.push(1);
var adrian = {
    nombre: 'Vicente',
    // edad:21,
    // casado:false,
    // fechaNacimiento: new Date(),
    saludar: function (nombre) {
        return '';
    }
};
adrian.apellido = 'Eguez';
var fecha = new Date();
fecha = new Date('2018-10-01');
var saludarDos = function (nombre) {
    return '';
};
function saludar(nombre, apellido) {
    var otrosNombres = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otrosNombres[_i - 2] = arguments[_i];
    }
    return 'hola';
}
var respuestaSaludar = saludar('Adrian', 'Eguez', 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 7, 5, 4, 3, 2, 1, 1, 12, 2, 3, 4, 5, 67, 8, 9, 0, 0, 2);
var UsuarioClase = /** @class */ (function () {
    function UsuarioClase() {
    }
    return UsuarioClase;
}());
var usuario = {
    nombre: 'Adrian'
};
// $ tsc nombre-archivo.ts --target es2017
