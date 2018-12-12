import {first} from "rxjs/operators";

const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;


const nomArchi = 'people.json';


//Leer bdd

function inicialiarBDD() {

    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'people.json',
                'utf-8',
                (error, contArchi) => { // CALLBACK
                    if (error) {

                        fs.writeFile(
                            'people.json',
                            '{"name":"","height":"","mass":"","hair_color":"","skin_color":"", "eye_color":"","birth_year":"", "gender":"","homeworld": "","films":[],"species": [],"vehicles": [],"starships": [],"created":"", "edited":"","url":""}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"name":"","height":"","mass":"","hair_color":"","skin_color":"", "eye_color":"","birth_year":"", "gender":"","homeworld": "","films":[],"species": [],"vehicles": [],"starships": [],"created":"", "edited":"","url":""}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contArchi)
                        })
                    }
                }
            )
        }
    );

}
//Gender
const respuestaBDD$ = rxjs.from(inicialiarBDD());
respuestaBDD$
    .then(
        (bd)=> {

            const cont = JSON.parse(JSON.stringify(bd));
            let generos = [];
            cont.forEach(

                (actual, indiceActual, arreglo)=> {
                    generos.push( actual["gender"]);
                    if(generos.indexOf(actual["gender"])!=null ){
                        console.log(actual["gender"])
                    }

                }
            )
        }

    );
// eye_color

respuestaBDD$
    .then(
        (bd)=> {

            const cont = JSON.parse(JSON.stringify(bd));
            cont.forEach(
                (actual, indiceActual, arreglo)=> {
                    console.log(actual["eye_color"])
                }
            )
        }

    );

//skin_color

respuestaBDD$
    .then(
        (bd)=> {

            const cont = JSON.parse(JSON.stringify(bd));
            cont.forEach(
                (actual, indiceActual, arreglo)=> {
                    console.log(actual["skin_color"])
                }
            )
        }

    );
//hair_color

respuestaBDD$
    .then(
        (bd)=> {

            const cont = JSON.parse(JSON.stringify(bd));
            const base = rxjs.of(cont);
            base.pipe(
                map(
                    resul => {
                        first(
                            resul => resul["hair_color"]
                        )
                    }
                )
            )
        }

    );


//Clasificacin


const Escritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};
//Clasificacion


function guardarBDD(bdd: BDD) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'people.json',
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
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}
interface RespuestaBDD {

    bdd: BDD;
    gender?: Gender;
    eye_color?: eye_color;
    hair_color?: hair_color;
    skin?: skin;

}
interface BDD {

    gender: Gender[] | any;
    eye_color: eye_color[];
    hair_color: hair_color[];
    skin: skin[];
}
interface Gender {
    id: number;
    gender: string;
}

interface eye_color {
    id: number;
    eye_color: string;
    idGender: number;
}
interface hair_color {
    id: number;
    hair_color: string;
    idGender: number;
}
interface skin {
    id: number;
    skin: string;
    idGender: number;
}


//


const arregloRespuesta =[
    {
        a:true
    },
    {
        b:false
    },
];

//llnjk

respuestaBDD$
    .then(
        (bd)=> {
            const contenido = JSON.parse(JSON.stringify(bd));


            contenido.forEach(
                (actual, indiceActual, arreglo)=> {

                    const letr = actual["name"].substring(0,1);
                    let letras = letr.match(
                        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                    );
                    if(letras[letr]){
                        arregloRespuesta.push({letra:true});
                        //console.log(Object.keys(abecedario))
                    }else{
                        arregloRespuesta.push({letra:false});
                    }
                }
            )
        }

    );

console.log(arregloRespuesta);




const cantidadMasa = {
    massTotal: Number("0"),
    heightTotal: Number("0")
};
console.log(cantidadMasa);
respuestaBDD$
    .then(
        (bd)=> {
            const contenido = JSON.parse(JSON.stringify(bd));
            contenido.forEach(
                (actual, indiceActual, arreglo)=> {
                    const mass  = Number(JSON.stringify(actual["massTotal"]));
                    const height= Number(actual["heightTotal"]);
                    console.log(mass + height);
                    cantidadMasa.massTotal = cantidadMasa.massTotal + mass;
                    cantidadMasa.heightTotal = cantidadMasa.heightTotal +height;
                    console.log(cantidadMasa);
                }
            )
        }

    );

console.log(cantidadMasa);
