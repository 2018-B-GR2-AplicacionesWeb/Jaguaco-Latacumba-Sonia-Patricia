
declare var require;
//const inquirer = require('inquirer');
const fs = require('Productos.fs');

declare var Promise:any;
export const lecturaArchi = new Promise(
    (resolve, reject) => {
        fs.readFile('Productos.json','utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escrituraArchivo = (contenidoLeido:string, datos:string) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + datos: datos;
            fs.writeFile('Productos.json', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

export const agregar = (arreglosDatos, Nuevo) =>{
    arreglosDatos.push(Nuevo);
    return new Promise(
        (resolve, reject) => {
            const archivo:string = 'Productos.json';
            const datos:string = '\n' + JSON.stringify(Nuevo);
            lecturaArchi
                .then(
                    (contenidoArchivo)=>{
                        return escrituraArchivo(contenidoArchivo,datos);
                    }
                )
        }
    )
};

export const listado = () =>{

    return new Promise(
        (resolve, reject) => {
            lecturaArchi
                .then(
                    (contenidoArchivo)=>{
                        console.log('\n*\n', contenidoArchivo);
                    }
                )
        }
    )
};