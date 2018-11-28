import {AppendFile, producto} from "./Archivo";

declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map;
const reduce = require('rxjs/operators').reduce;





// Entidades
class Art{
    tipo:string;

    constructor(tipo:string){


        this.tipo = tipo;
    }
}

class Orden{
    arti:Art;
    cantidad;
    valor_detalle=0.0;

    constructor(producto:Art, cantidad:Number) {
        this.arti = producto;
        this.cantidad=cantidad;

    }
    public toString = () : string => {
        let espacios:string = "         ";
        return `${this.arti.tipo}${espacios.substring(this.arti.tipo.length)}${this.cantidad}${espacios.substring(String(this.cantidad).length)}`;
    }
}

class Pedido{

    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };

}

let preguntasMenu = [

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
let login = [
    {
        type: "list",
        name: "sesion",
        message: "Ingreso:",
        choices: ['Ingresar','produtos'],
        //filter:( val )=>{ return val.toLowerCase(); }
    },

];

let preguntas_login = [
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
            if (answer!=='1') {
                return 'Password required!';
            }
            return true;
        }
    },
];

let CRUD = [
    {
        type:"list",
        name:"crud_op",
        message:"Escoja una opcion",
        choices: ['Consultar','Modificar','Eliminar','Nueva','salir'],
        validate:(respuesta)=>{
            if(respuesta.crud_op=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    }
];

let actualizar = [
    {
        type:'input',
        name:"old",
        message:"Ingrese nombre del producto?"
    },
    {
        type:'input',
        name:"nuevo",
        message:"Ingrese el nuevo nombre del producto?"
    }
];

let eliminar = [
    {
        type:"input",
        name:'borrar',
        message:"Ingrese nombre del producto?",

    }
];

let insertar = [
    {
        type:"input",
        name:'insert',
        message:"Ingrese nombre del producto:",

    },
    {
        type:'input',
        name:"saldo",
        message:"Ingrese el precio:",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];

let menu_secundario = [

    {
        type: "list",
        name: "clase",
        message: "producto",
        choices: producto,
        filter:( val )=>{ return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cantidad",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type:"confirm",
        name:"seguir",
        message:"Nueva compra?",
    },

];




// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(login)
        .then(
            (respuestas) => {
                if (respuestas.sesion == 'ingresar') {
                    // Menu administrador
                    inquirer
                        .prompt(preguntas_login)
                        .then((respuestas) => {
                                if (respuestas.clave) {
                                    menu_crud();
                                }else {
                                    console.log(respuestas.clave);
                                    iniciar();
                                }
                            }
                        );
                } else {
                    inquirer
                        .prompt(preguntasMenu)
                        .then((respuestas) => {
                                if (respuestas.opciones != 'Salir') {
                                    console.log('Eliga un producto del menu:')
                                    let pedido = new Pedido();
                                    pedidos(pedido);
                                }
                            }
                        );
                }

            }
        );


}


function menu_crud(){
    inquirer
        .prompt(CRUD)
        .then((respuestas) => {
                if (respuestas.crud_op === 'salir') {
                    console.log(respuestas.clave);
                    iniciar();
                } else {
                    switch (respuestas.crud_op) {
                        case 'Consultar':
                            producto.forEach(
                                (valor)=>{
                                    console.log(valor)
                                }
                            );
                            break;
                        case 'Modificar':
                            inquirer
                                .prompt(actualizar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        producto.forEach((element, index, array) => {

                                            if (element == String(respuestas.old)) {
                                                console.log('econtrado');
                                                array[index]= respuestas.nuevo
                                            }
                                            console.log(`${element},${respuestas.old}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(producto);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    contenido=contenido+ok+"||";
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('./articulos',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Eliminar':
                            inquirer
                                .prompt(eliminar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        producto.forEach((element, index, array) => {

                                            if (element == String(respuestas.borrar)) {
                                                console.log('econtrado');
                                                array[index]='';
                                            }
                                            console.log(`${element},${respuestas.borrar}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(producto);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('./articulos',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Nueva':


                            inquirer
                                .prompt(insertar)
                                .then((respuestas) => {
                                    console.log(respuestas);
                                    let  res1 = respuestas.insert;
                                    let res2 = respuestas.saldo;
                                    producto.push(res1 + ',' + res2);
                                    
                                    let contenido = '';
                                    const ingresa$ = rxjs.from(producto);
                                    ingresa$
                                        .subscribe((ok) => {
                                                if (ok) {

                                                    contenido = contenido + ok + "||";
                                                }
                                            },

                                            (error) => {
                                                console.log("error:", error);
                                            }, () => {
                                                // volver a actualizar la base
                                                AppendFile('./articulos', contenido, true)
                                                    .then(() => {
                                                        console.log('contenido actualizado');
                                                        menu_crud();
                                                    });
                                            });
                                });

                            break;
                    }

                    //menu_crud();
                }

            }
        );
}


function pedidos(pedido:Pedido) {
    inquirer
        .prompt(menu_secundario)
        .then(
            (respuestas)=>{


                let medicamento = new Art(respuestas.clase);
                let cantidad = respuestas.cantidad
                pedido.ordenes.push(new Orden(medicamento,cantidad));

                if (respuestas.seguir){
                    pedidos(pedido)
                }else {
                    console.log('-------------------------------------------' +
                        '\nDetalle del producto solicitada\n' +
                        '-----------------------------------------\n'+
                        'Detalle,$0.0 Cantidad    \n' +
                        '.............................')
                    pedido.mostrar_ordenes();
                    console.log("........................");

                }
            }
        );
}
iniciar();
