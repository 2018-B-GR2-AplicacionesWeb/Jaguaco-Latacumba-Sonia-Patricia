"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Archivo_1 = require("./Archivo");
var inquirer = require('inquirer');
var rxjs = require('rxjs');
var fs = require('fs');
var map = require('rxjs/operators').map;
var reduce = require('rxjs/operators').reduce;
// Entidades
var Art = /** @class */ (function () {
    function Art(tipo) {
        this.tipo = tipo;
    }
    return Art;
}());
var Orden = /** @class */ (function () {
    function Orden(producto, cantidad) {
        var _this = this;
        this.valor_detalle = 0.0;
        this.toString = function () {
            var espacios = "         ";
            return "" + _this.arti.tipo + espacios.substring(_this.arti.tipo.length) + _this.cantidad + espacios.substring(String(_this.cantidad).length);
        };
        this.arti = producto;
        this.cantidad = cantidad;
    }
    return Orden;
}());
var Pedido = /** @class */ (function () {
    function Pedido() {
        this.ordenes = [];
    }
    Pedido.prototype.mostrar_ordenes = function () {
        this.ordenes.forEach(function (orden) {
            console.log(orden.toString());
        });
    };
    ;
    return Pedido;
}());
var preguntasMenu = [
    {
        type: "list",
        name: "Opciones",
        message: "Que desea hacer?",
        choices: [
            "Ordenar productos",
            "Salir",
        ],
    },
];
// Preguntas del menu secundario
var login = [
    {
        type: "list",
        name: "sesion",
        message: "Ingreso:",
        choices: ['Ingresar', 'produtos'],
    },
];
var preguntas_login = [
    {
        type: 'input',
        name: 'nickname',
        message: "Usuario",
    },
    {
        type: 'password',
        message: 'Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer !== '1') {
                return 'Password required!';
            }
            return true;
        }
    },
];
var CRUD = [
    {
        type: "list",
        name: "crud_op",
        message: "Escoja una opcion",
        choices: ['Consultar', 'Modificar', 'Eliminar', 'Nueva', 'salir'],
        validate: function (respuesta) {
            if (respuesta.crud_op == 'salir') {
                return false;
            }
            else {
                return respuesta;
            }
        }
    }
];
var actualizar = [
    {
        type: 'input',
        name: "old",
        message: "Ingrese nombre del producto?"
    },
    {
        type: 'input',
        name: "nuevo",
        message: "Ingrese el nuevo nombre del producto?"
    }
];
var eliminar = [
    {
        type: "input",
        name: 'borrar',
        message: "Ingrese nombre del producto?",
    }
];
var insertar = [
    {
        type: "input",
        name: 'insert',
        message: "Ingrese nombre del producto:",
    },
    {
        type: 'input',
        name: "saldo",
        message: "Ingrese el precio:",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];
var menu_secundario = [
    {
        type: "list",
        name: "clase",
        message: "producto",
        choices: Archivo_1.producto,
        filter: function (val) { return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cantidad",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type: "confirm",
        name: "seguir",
        message: "Nueva compra?",
    },
];
// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(login)
        .then(function (respuestas) {
        if (respuestas.sesion == 'ingresar') {
            // Menu administrador
            inquirer
                .prompt(preguntas_login)
                .then(function (respuestas) {
                if (respuestas.clave) {
                    menu_crud();
                }
                else {
                    console.log(respuestas.clave);
                    iniciar();
                }
            });
        }
        else {
            inquirer
                .prompt(preguntasMenu)
                .then(function (respuestas) {
                if (respuestas.opciones != 'Salir') {
                    console.log('Eliga un producto del menu:');
                    var pedido = new Pedido();
                    pedidos(pedido);
                }
            });
        }
    });
}
function menu_crud() {
    inquirer
        .prompt(CRUD)
        .then(function (respuestas) {
        if (respuestas.crud_op === 'salir') {
            console.log(respuestas.clave);
            iniciar();
        }
        else {
            switch (respuestas.crud_op) {
                case 'Consultar':
                    Archivo_1.producto.forEach(function (valor) {
                        console.log(valor);
                    });
                    break;
                case 'Modificar':
                    inquirer
                        .prompt(actualizar)
                        .then(function (respuestas) {
                        //buscar y reemplazar
                        Archivo_1.producto.forEach(function (element, index, array) {
                            if (element == String(respuestas.old)) {
                                console.log('econtrado');
                                array[index] = respuestas.nuevo;
                            }
                            console.log(element + "," + respuestas.old);
                        });
                        var contenido = '';
                        var pizza$ = rxjs.from(Archivo_1.producto);
                        pizza$
                            .subscribe(function (ok) {
                            contenido = contenido + ok + "||";
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            Archivo_1.AppendFile('./articulos', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
                case 'Eliminar':
                    inquirer
                        .prompt(eliminar)
                        .then(function (respuestas) {
                        //buscar y reemplazar
                        Archivo_1.producto.forEach(function (element, index, array) {
                            if (element == String(respuestas.borrar)) {
                                console.log('econtrado');
                                array[index] = '';
                            }
                            console.log(element + "," + respuestas.borrar);
                        });
                        var contenido = '';
                        var pizza$ = rxjs.from(Archivo_1.producto);
                        pizza$
                            .subscribe(function (ok) {
                            if (ok) {
                                contenido = contenido + ok + ",";
                            }
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            Archivo_1.AppendFile('./articulos', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
                case 'Nueva':
                    inquirer
                        .prompt(insertar)
                        .then(function (respuestas) {
                        console.log(respuestas);
                        var res1 = respuestas.insert;
                        var res2 = respuestas.saldo;
                        Archivo_1.producto.push(res1 + ',' + res2);
                        var contenido = '';
                        var ingresa$ = rxjs.from(Archivo_1.producto);
                        ingresa$
                            .subscribe(function (ok) {
                            if (ok) {
                                contenido = contenido + ok + "||";
                            }
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            Archivo_1.AppendFile('./articulos', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
            }
            //menu_crud();
        }
    });
}
function pedidos(pedido) {
    inquirer
        .prompt(menu_secundario)
        .then(function (respuestas) {
        var medicamento = new Art(respuestas.clase);
        var cantidad = respuestas.cantidad;
        pedido.ordenes.push(new Orden(medicamento, cantidad));
        if (respuestas.seguir) {
            pedidos(pedido);
        }
        else {
            console.log('-------------------------------------------' +
                '\nDetalle del producto solicitada\n' +
                '-----------------------------------------\n' +
                'Detalle,$0.0 Cantidad    \n' +
                '.............................');
            pedido.mostrar_ordenes();
            console.log("........................");
        }
    });
}
iniciar();
