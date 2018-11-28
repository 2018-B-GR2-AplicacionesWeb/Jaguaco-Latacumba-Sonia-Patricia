"use strict";
exports.__esModule = true;
var acciones = require("./Acciones");
var inquirer = require('inquirer');
var fechaActual = new Date();
function start() {
    inquirer
        .prompt([
            {
                type: 'list', name: 'Menu', message: 'Seleccione una opcion',
                choices: ['Ingresar Datos ', 'Listar Roductos ', 'Consultar', 'Salir']
            }
        ])
        .then(function (opcionMenu) {
            //console.log(opcionMenu.Menu);
            switch (opcionMenu.Menu) {
                case 'Ingresar Datos':
                    console.log('1');
                    inquirer.prompt([
                        {
                            type: 'input', name: 'nombre', message: 'Ingrese el nombre'
                        },
                        {
                            type: 'input', name: 'precio', message: 'Ingrese el precio'},
                        {
                            type: 'input', name: 'marca', message: 'Ingrese la marca'
                        }
                    ])
                        .then(function (respuestasNuevo)
                        {
                            var Nuevo = {
                                nombre: respuestasNuevo.nombre,
                                precio: respuestasNuevo.precio,
                                marca: respuestasNuevo.marca
                            };
                            acciones.agregarLibro(acciones.libros, );
                            console.log('Libro ingresado con exito.!');
                            start();
                        });
                    break;
                case 'Listar Roductos':
                    acciones.listado();
                    start();
                    break;
                case 'Ingrese el genero del Libro':
                    acciones.listado();
                    //console.log('Escoja un libro de la lista');
                    inquirer.prompt([
                        {
                            type: 'input', name: 'Titulo', message: 'Ingrese el tituo del Libro'
                        }
                    ])
                        .then(function (respuestasNuevoPr) {
                            var nuevoPrestamo = {
                                fecha: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear(),
                                nombreLibro: respuestasNuevoPr.Titulo,
                                fechaEntrega: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 2) + '/' + fechaActual.getFullYear()
                            };
                            acciones.crearPrestamo(acciones.prestamosLibros, nuevoPrestamo);
                            console.log('Prestamo registrado con exito.!');
                            start();
                        });
                    break;
                case 'Salir':
                    break;
            }
        });
}
start();
