//  01-tipos-variables.ts
// DUCK TYPING -> DUCK
let nombre = 'Adrian';
nombre = '1';
nombre = [];
let edad = 21.2;
edad = '12';
let casado = false;
casado = true;
casado = null;
casado = undefined;
const arregloNumeros = [1, 2, 3];
arregloNumeros.push(1);
const adrian = {
    nombre: 'Vicente',
    // edad:21,
    // casado:false,
    // fechaNacimiento: new Date(),
    saludar: (nombre) => {
        return '';
    }
};
adrian.apellido = 'Eguez';
let fecha = new Date();
fecha = new Date('2018-10-01');
const saludarDos = (nombre) => {
    return '';
};
function saludar(nombre, apellido, ...otrosNombres) {
    return 'hola';
}
let respuestaSaludar = saludar('Adrian', 'Eguez', 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 7, 5, 4, 3, 2, 1, 1, 12, 2, 3, 4, 5, 67, 8, 9, 0, 0, 2);
class UsuarioClase {
}
const usuario = {
    nombre: 'Adrian'
};
// $ tsc nombre-archivo.ts --target es2017