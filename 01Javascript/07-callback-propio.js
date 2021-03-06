// 07-callback-propio.js
const fs = require('fs');

let contenidoFinal = 'Inicial';
//Metodo cambiado a promise
function appendFile(nombreArchivo,
                    contenidoArchivo,
                    callback  ) {
    // 1 -> leer archivo
    // 2.1 -> Concatenams contenido
    // 2.2 -> Creamos el archivo
    fs.readFile(
        nombreArchivo,
        'utf-8',
        (reject, resolve) => {
            if (reject) {
                const contenido = contenidoArchivo;
                fs.writeFile(
                    nombreArchivo,
                    contenido,
                    (err) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(undefined, contenido);
                        }
                    }
                );
            } else {
                const contenido = resolve + contenidoArchivo;
                fs.writeFile(
                    nombreArchivo,
                    contenido,
                    (err) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(undefined, contenido);
                        }
                    }
                );
            }
        }
    );
}

appendFile(
    '07-texto.txt',
    '\nAdios',
    (error, contenidoTexto) => {
        if (error) {
            console.log(error);
        } else {
            console.log(contenidoTexto)
        }
    }
);

// ['A','B','C']

// 0-A.txt  'A'
// 1-B.txt  'B'
// 2-C.txt  'C'

const respuesta = {
    nombreArchivo: '0-A.txt',
    contenidoArchivo: 'A',
    error: undefined
};

// [respuesta, respuesta, respuesta, respuesta]


function ejercicio(
    arregloStrings,
    callback) {
    const arregloRespuestas = [];

    arregloStrings
        .forEach(
            (string, indice) => {
                const nombreArchivo = `${indice}-${string}.txt`;
                const contenidoArchio = string;

                fs.writeFile(
                    nombreArchivo,
                    contenidoArchio,
                    (err) => {
                        const respuesta = {
                            nombreArchivo: nombreArchivo,
                            contenidoArchivo: contenidoArchio,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const terminoElArreglo = arregloStrings.length === arregloRespuestas.length;
                        if (terminoElArreglo) {
                            callback(arregloRespuestas);
                        }

                    }
                )

            }
        );

    /*
    for (let i = 0; i < arregloStrings.length; i++) {
        fs.writeFile(
            `${i}-${arregloStrings[i]}.txt`,
            arregloStrings[i],
            function (err) {
                const respuesta = {
                    nombreArchivo: `${i}-${arregloStrings[i]}.txt`,
                    contenidoArchivo: arregloStrings[i],
                    error: err
                };
                arregloRespuestas.push(respuesta);
                const terminoElArreglo = arregloStrings.length === arregloRespuestas.length;
                if (terminoElArreglo) {
                    callback(arregloRespuestas);
                }
            }
        )
    }
    */


}
const arregloStrings = ['A', 'B', 'C'];

ejercicio(arregloStrings,
    (arregloRespuestas) => {
        console.log("",arregloRespuestas);
    });




function ejercicios(arregloStrings) {

    return new Promise(
        (resolve,reject)=>{
            const arregloRespuestas = [];

            arregloStrings
                .forEach(
                    (string, indice) => {
                        const archivo = `${indice}-${string}.txt`;
                        const contenido = string;
                        fs.writeFile(archivo,
                            contenido,
                            (err) => {
                                const respuesta = {
                                    nombreArchivo: archivo,
                                    contenidoArchivo: contenido,
                                    error: err
                                };
                                arregloRespuestas.push(respuesta);
                                const tamanoRespuestas = arregloRespuestas.length;
                                if (tamanoRespuestas === arregloStrings.length) {
                                    resolve(arregloRespuestas)
                                }
                            });
                    }
                );
        }
    );

}
