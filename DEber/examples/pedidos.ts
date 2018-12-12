
"use strict";
'use strict';
const inquirer = require('inquirer');

import {agregar,lecturaArchi, listado, } from './Acciones';
Object.defineProperty(exports, "__esModule", { value: true });
export const opcionesMenu=
    [
        'crear',
        'borrar',
        'actualizar',
        'leer'
    ]
function res(ingresa) {
    return function(answers) {
        return answers[ingresa];
    };
}
export const menu=[
    {
        type:'list',
        name:'opcionMenuSeleccionado2',
        message: 'Escoja Opcion',
        choices: opcionesMenu,   filter: function(val="crear") {

            return val.toLowerCase();
        }
    },
    {
        type:'confirm',
        name:'opcionMenuSeleccionado2',
        message: 'Quieres Continuar',


    },


    {
        type: 'input',
        name: 'first_name',
        message: "Ingresa Tu Nombre"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Ingresa tu Aellido",
        default: function() {
            return 'Jaguaco';
        }
    },

    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number",
        validate: function(value) {
            var pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }

            return 'Please enter a valid phone number';
        }
    },
    {
        type: 'list',
        name: 'Menu',
        message: 'Escoge el Producto: ?',
        choices: ['RoPa', 'Tecnologia', 'Hogar'],
        filter: function(val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'Dimension',
        message: 'Cuantos Necesitas?',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'NUMERO';
        },
        filter: Number
    },
    {
        type: 'expand',
        name: 'Variedades',
        message: 'Escoge lo que necesitas?',
        choices: [
            {
                key: 't',
                name: 'Tecnologia y Lato',
                value: 'Tecnologia'
            },
            {
                key: 'R',
                name: 'Ropa',
                value: 'Ropa'
            },
            {
                key: 'V',
                name: 'Variedades',
                value: 'Variedades'
            }
        ]
    },
    {
        type: 'rawlist',
        name: 'tecno',
        message: 'You also get a free 2L beverage',
        choices: ['audifonos', 'laptops', 'accesorios']
    },
   /* {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when: function(answers) {
            return answers.comments !== 'Nope, all good!';
        }
    }*/
]



















