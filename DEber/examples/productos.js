"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "__esModule", { value: true });
var pedidos_1 = require("./pedidos");
var inquirer = require('inquirer');
var fs = require('fs');
//console.log (menuPrincipal);
inquirer
    .prompt(pedidos_1.menu)
    .then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '));
});
