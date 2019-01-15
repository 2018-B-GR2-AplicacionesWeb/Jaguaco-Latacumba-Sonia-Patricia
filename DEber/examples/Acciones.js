"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const inquirer = require('inquirer');
var fs = require('Productos.fs');
exports.lecturaArchi = new Promise(function (resolve, reject) {
    fs.readFile('Productos.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var escrituraArchivo = function (contenidoLeido, datos) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datos : datos;
        fs.writeFile('Productos.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
exports.agregar = function (arreglosDatos, Nuevo) {
    arreglosDatos.push(Nuevo);
    return new Promise(function (resolve, reject) {
        var archivo = 'Productos.json';
        var datos = '\n' + JSON.stringify(Nuevo);
        exports.lecturaArchi
            .then(function (contenidoArchivo) {
            return escrituraArchivo(contenidoArchivo, datos);
        });
    });
};
exports.listado = function () {
    return new Promise(function (resolve, reject) {
        exports.lecturaArchi
            .then(function (contenidoArchivo) {
            console.log('\n*\n', contenidoArchivo);
        });
    });
};
