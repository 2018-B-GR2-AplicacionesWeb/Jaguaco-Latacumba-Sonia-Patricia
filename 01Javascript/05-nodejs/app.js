//app.js con estos metodos llaman¡mos a otros archivos dentro de un archivo en el caos q necesitemos
const nodejs=require("./nodes.js");
const runtime=require("./runtime.js");
const so=require("./so.js");
const util=require("./util/util.js");
const va=require("../01-Variables");
const fs=require("fs");
const exress=require("express");

console.log(util());
console.log(va);
console.log(fs);

console.log(exress);