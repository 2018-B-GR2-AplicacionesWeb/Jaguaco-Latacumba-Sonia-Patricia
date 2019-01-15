var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var timer = require('rxjs').timer;
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var retryWhen = require('rxjs/operators').retryWhen;
var delayWhen = require('rxjs/operators').delayWhen;
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Salir'
    ]
};
var preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo del producto',
    }
];
var preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es el codigo del producto'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre del producto'
    },
    {
        type: 'input',
        name: 'precio',
        message: 'Cual es el precio'
    },
];
var preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es eo l nuevo nombre del nuevo producto'
    },
];
var preguntas_menu_principal = [
    {
        type: "list",
        name: "opciones",
        message: "Que desea hacer?",
        choices: [
            "Ordenar pizza",
            "Salir",
        ],
    },
];
var preguntas_login = [
    {
        type: "list",
        name: "sesion",
        message: "Entrar como:",
        choices: ['Administrador', 'Cliente'],
        filter: function (val) { return val.toLowerCase(); }
    },
];
var preguntas_login_administrador = [
    {
        type: 'input',
        name: 'nickname',
        message: "nickname",
    },
    {
        type: 'password',
        message: 'User Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer !== 'admin') {
                return 'User Password required!';
            }
            return true;
        }
    },
];
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile('bdd.json', '{"usuarios":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"usuarios":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuestaBDD$;
        return __generator(this, function (_a) {
            respuestaBDD$ = rxjs.from(inicialiarBDD());
            respuestaBDD$
                .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
                .subscribe(function (data) {
                //
                console.log(data);
            }, function (error) {
                //
                console.log(error);
            }, function () {
                main();
                console.log('Complete');
            });
            return [2 /*return*/];
        });
    });
}
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
function preguntarOpcionesUser() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            //preguntas_login
            //.from(inquirer.prompt(preguntaMenu))
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
            // Cualquier cosa JS
        }));
        // OBSERVABLE!!!!!!!!!!
    });
}
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            //preguntas_login
            //.from(inquirer.prompt(preguntaMenu))
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
            // Cualquier cosa JS
        }));
        // OBSERVABLE!!!!!!!!!!
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map(function (producto) {
                    respuestaBDD.producto = producto;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return consultarid(respuestaBDD);
            case 'Actualizar':
                return preguntarIdUsuario(respuestaBDD);
            case 'Borrar':
                return consultarid(respuestaBDD);
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var producto = respuestaBDD.producto;
                respuestaBDD.bdd.usuarios.push(producto);
                return respuestaBDD;
            case 'Actualizar':
                var indice1 = respuestaBDD.indiceproduc;
                respuestaBDD.bdd.usuarios[indice1].nombre = respuestaBDD.producto.nombre;
                return respuestaBDD;
            case 'Buscar':
                var id = respuestaBDD.indiceproduc;
                if (id === -1) {
                    console.error('error');
                }
                else {
                    console.log('producto Buscado', respuestaBDD.bdd.usuarios[id]);
                }
                return respuestaBDD;
            case 'Borrar':
                var id3 = respuestaBDD.indiceproduc;
                if (id3 === -1) {
                    console.error('error');
                }
                else {
                    console.log('producto Buscado', respuestaBDD.bdd.usuarios[id3]);
                    var a = respuestaBDD.bdd.usuarios;
                    a.splice(respuestaBDD.bdd.usuarios[id3], 1);
                }
                return respuestaBDD;
        }
    });
}
function preguntarIdUsuario(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        function (producto) {
            return producto.id === respuesta.idUsuario;
        });
        if (indiceUsuario === -1) {
            console.log('preguntando de nuevo');
            return preguntarIdUsuario(respuestaBDD);
        }
        else {
            respuestaBDD.indiceproduc = indiceUsuario;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionUsuario))
                .pipe(map(function (nombre) {
                respuestaBDD.producto = {
                    id: null,
                    nombre: nombre.nombre,
                    precio: null
                };
                return respuestaBDD;
            }));
        }
    }));
}
function consultarid(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(map(// RESP ANT OBS
    function (respuesta) {
        var indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(function (producto) {
            return producto.id === respuesta.idUsuario;
        });
        respuestaBDD.indiceproduc = indiceUsuario;
        return respuestaBDD;
    }));
}
