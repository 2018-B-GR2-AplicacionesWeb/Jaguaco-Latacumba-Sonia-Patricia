

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import {menu} from './pedidos';



let inquirer = require('inquirer');
let fs = require('fs');

//console.log (menuPrincipal);
inquirer
    .prompt(
        menu
    )
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });
