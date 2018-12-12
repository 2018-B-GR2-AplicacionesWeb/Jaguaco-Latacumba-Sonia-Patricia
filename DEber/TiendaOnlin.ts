declare var require: any;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;

const preguntaMenu = {
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

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo del producto',
    }
];

const preguntaUsuario = [
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

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es eo l nuevo nombre del nuevo producto'
    },
];


const preguntas_menu_principal = [

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


const preguntas_login = [
    {
        type: "list",
        name: "sesion",
        message: "Entrar como:",
        choices: ['Administrador','Cliente'],
        filter:( val )=>{ return val.toLowerCase(); }
    },

];

const preguntas_login_administrador = [
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
            if (answer!=='admin') {
                return 'User Password required!';
            }
            return true;
        }
    },
];

function inicialiarBDD() {

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"usuarios":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}

async function main() {

    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());

    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}

function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}


main();

function preguntarOpcionesUser() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
            //preguntas_login
                //.from(inquirer.prompt(preguntaMenu))
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                            // Cualquier cosa JS
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
    )
}



function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                //preguntas_login
                //.from(inquirer.prompt(preguntaMenu))
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                            // Cualquier cosa JS
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
)
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (producto: producto) => { // resp ant OBS
                                    respuestaBDD.producto = producto;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':

                    return consultarid(respuestaBDD);
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    return consultarid(respuestaBDD);
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const producto = respuestaBDD.producto;
                    respuestaBDD.bdd.usuarios.push(producto);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice1 = respuestaBDD.indiceproduc;
                    respuestaBDD.bdd.usuarios[indice1].nombre = respuestaBDD.producto.nombre;
                    return respuestaBDD;
                case 'Buscar':

                    const id = respuestaBDD.indiceproduc;
                    if(id===-1){
                        console.error('error')
                    }else{
                        console.log('producto Buscado',respuestaBDD.bdd.usuarios[id])
                    }
                    return respuestaBDD;
                case 'Borrar':
                    const id3 = respuestaBDD.indiceproduc;
                    if(id3===-1){
                        console.error('error')
                    }else{

                        console.log('producto Buscado',respuestaBDD.bdd.usuarios[id3]);
                        const a = respuestaBDD.bdd.usuarios
                        a.splice(respuestaBDD.bdd.usuarios[id3],1)

                    }
                    return respuestaBDD;
            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    producto?: producto;
    indiceproduc?: number;
}

interface BDD {
    usuarios: producto[] | any;

}


interface producto {
    id: number;
    nombre: string;
    precio:number;
}


interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (producto: any) => {
                                return producto.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceproduc = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(
                                    (nombre: { nombre: string }) => {
                                        respuestaBDD.producto= {
                                            id: null,
                                            nombre: nombre.nombre,
                                            precio: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );

                    }

                }
            )
        );
}

function consultarid(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex(
                            (producto: any) => {

                                return producto.id === respuesta.idUsuario

                            }
                        );

                    respuestaBDD.indiceproduc = indiceUsuario;

                    return respuestaBDD;


                }
            )
        );
}