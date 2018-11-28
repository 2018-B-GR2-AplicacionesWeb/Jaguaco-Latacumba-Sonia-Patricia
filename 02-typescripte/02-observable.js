// 02-observables.ts
var rxjs = require('rxjs');
var map = require('rxjs/operators').map;
var distinct = require('rxjs/operators').distinct;
var concat = require('rxjs/operators').concat;
var numeros$ = rxjs.of(1, true, 2, 'Adrian', 3, { nombre: 'Adrian' }, 2, ['oli'], 2, function () {
});
numeros$
    .pipe(distinct(), map(function (valorActual) {
    return {
        data: valorActual
    };
}))
    .subscribe(function (ok) {
    console.log('En ok', ok);
}, function (error) {
    console.log('Error:', error);
}, function () {
    console.log('Complete');
});
var promesita = function (funciona) {
    return new Promise(function (resolve, reject) {
        if (funciona) {
            resolve(' :) ');
        }
        else {
            reject(' :( ');
        }
    });
};
var promesita$ = rxjs.from(promesita(true));
promesita$
    .subscribe(function (ok) {
    console.log('Promesita bien ', ok);
}, function (error) {
    console.log('Promesita mal', error);
}, function () {
    console.log('Completado');
});
var observableConcatenado$ = numeros$
    .pipe(concat(promesita$), distinct(), map(function (valorActual) {
    console.log('Ejecuto');
    return {
        data: valorActual
    };
}));
observableConcatenado$
    .subscribe(function (ok) {
    console.log('Concatenado bien ', ok);
}, function (error) {
    console.log('Error', error);
}, function () {
    console.log('Completado');
});
