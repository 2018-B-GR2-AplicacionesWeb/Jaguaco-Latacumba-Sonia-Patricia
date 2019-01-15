"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var timer = require('rxjs').timer;
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var retryWhen = require('rxjs/operators').retryWhen;
var delayWhen = require('rxjs/operators').delayWhen;
var nomArchi = 'people.json';
//Leer bdd
function inicialiarBDD() {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile('people.json', 'utf-8', function (error, contArchi) {
            if (error) {
                fs.writeFile('people.json', '{"name":"","height":"","mass":"","hair_color":"","skin_color":"", "eye_color":"","birth_year":"", "gender":"","homeworld": "","films":[],"species": [],"vehicles": [],"starships": [],"created":"", "edited":"","url":""}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"name":"","height":"","mass":"","hair_color":"","skin_color":"", "eye_color":"","birth_year":"", "gender":"","homeworld": "","films":[],"species": [],"vehicles": [],"starships": [],"created":"", "edited":"","url":""}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contArchi)
                });
            }
        });
    });
}
//Gender
var respuestaBDD$ = rxjs.from(inicialiarBDD());
respuestaBDD$
    .then(function (bd) {
    var cont = JSON.parse(JSON.stringify(bd));
    var generos = [];
    cont.forEach(function (actual, indiceActual, arreglo) {
        generos.push(actual["gender"]);
        if (generos.indexOf(actual["gender"]) != null) {
            console.log(actual["gender"]);
        }
    });
});
// eye_color
respuestaBDD$
    .then(function (bd) {
    var cont = JSON.parse(JSON.stringify(bd));
    cont.forEach(function (actual, indiceActual, arreglo) {
        console.log(actual["eye_color"]);
    });
});
//skin_color
respuestaBDD$
    .then(function (bd) {
    var cont = JSON.parse(JSON.stringify(bd));
    cont.forEach(function (actual, indiceActual, arreglo) {
        console.log(actual["skin_color"]);
    });
});
//hair_color
respuestaBDD$
    .then(function (bd) {
    var cont = JSON.parse(JSON.stringify(bd));
    var base = rxjs.of(cont);
    base.pipe(map(function (resul) {
        operators_1.first(function (resul) { return resul["hair_color"]; });
    }));
});
//Clasificacin
var Escritura = function (nombreArchivo, contenidoArchivo) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreArchivo, contenidoArchivo, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
//Clasificacion
function guardarBDD(bdd) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.writeFile('people.json', JSON.stringify(bdd), function (error) {
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
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
//
var arregloRespuesta = [
    {
        a: true
    },
    {
        b: false
    },
];
//llnjk
respuestaBDD$
    .then(function (bd) {
    var contenido = JSON.parse(JSON.stringify(bd));
    contenido.forEach(function (actual, indiceActual, arreglo) {
        var letr = actual["name"].substring(0, 1);
        var letras = letr.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
        if (letras[letr]) {
            arregloRespuesta.push({ letra: true });
            //console.log(Object.keys(abecedario))
        }
        else {
            arregloRespuesta.push({ letra: false });
        }
    });
});
console.log(arregloRespuesta);
var cantidadMasa = {
    massTotal: Number("0"),
    heightTotal: Number("0")
};
console.log(cantidadMasa);
respuestaBDD$
    .then(function (bd) {
    var contenido = JSON.parse(JSON.stringify(bd));
    contenido.forEach(function (actual, indiceActual, arreglo) {
        var mass = Number(JSON.stringify(actual["massTotal"]));
        var height = Number(actual["heightTotal"]);
        console.log(mass + height);
        cantidadMasa.massTotal = cantidadMasa.massTotal + mass;
        cantidadMasa.heightTotal = cantidadMasa.heightTotal + height;
        console.log(cantidadMasa);
    });
});
console.log(cantidadMasa);
