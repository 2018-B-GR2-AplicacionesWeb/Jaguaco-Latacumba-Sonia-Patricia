// 06-callbacks.js

const fs = require('fs');

console.log('Inicio');
fs.readFile(
    '06-texto.txt', // nombreArchivo
    'utf-8',
    (error, textoLeidoDelArchivo) => {
        if (error) {
            try{
                throw new Error(error);
            } catch (e) {
                console.log(e)
            }

        } else {
            // AQUI
            console.log('Inicio2');
            fs.writeFile(
                '06-texto.txt',
                textoLeidoDelArchivo + 'Mundo',
                (err)=>{
                    if(err) console.log('Error');
                    console.log('Archivo actualizado');

                    // CALLBACK HELL!!!!

                    fs.writeFile(
                        '06-texto.txt',
                        textoLeidoDelArchivo + 'Mundo',
                        (err)=>{
                            if(err) console.log('Error');
                            console.log('Archivo actualizado');
                            fs.writeFile(
                                '06-texto.txt',
                                textoLeidoDelArchivo + 'Mundo',
                                (err)=>{
                                    if(err) console.log('Error');
                                    console.log('Archivo actualizado');
                                    fs.writeFile(
                                        '06-texto.txt',
                                        textoLeidoDelArchivo + 'Mundo',
                                        (err)=>{
                                            if(err) console.log('Error');
                                            console.log('Archivo actualizado');
                                            fs.writeFile(
                                                '06-texto.txt',
                                                textoLeidoDelArchivo + 'Mundo',
                                                (err)=>{
                                                    if(err) console.log('Error');
                                                    console.log('Archivo actualizado');
                                                    fs.writeFile(
                                                        '06-texto.txt',
                                                        textoLeidoDelArchivo + 'Mundo',
                                                        (err)=>{
                                                            if(err) console.log('Error');
                                                            console.log('Archivo actualizado');
                                                            fs.writeFile(
                                                                '06-texto.txt',
                                                                textoLeidoDelArchivo + 'Mundo',
                                                                (err)=>{
                                                                    if(err) console.log('Error');
                                                                    console.log('Archivo actualizado');
                                                                    fs.writeFile(
                                                                        '06-texto.txt',
                                                                        textoLeidoDelArchivo + 'Mundo',
                                                                        (err)=>{
                                                                            if(err) console.log('Error');
                                                                            console.log('Archivo actualizado');
                                                                            fs.writeFile(
                                                                                '06-texto.txt',
                                                                                textoLeidoDelArchivo + 'Mundo',
                                                                                (err)=>{
                                                                                    if(err) console.log('Error');
                                                                                    console.log('Archivo actualizado');
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );

                }
            );
            console.log('Fin2');
        }
    }
);

console.log('Fin');

//["A","B","C"]recibe un arreglo
//0-A.txt "A"
//1-B.txt  "B"
//2-C.txt  "C"
const resuesta={
    nombreArchivo:"0-A.txt",
    contenidoArchivo:"A",
    error:undefined
}
[resuesta,resuesta,resuesta,resuesta,resuesta]
function ejercicio(arregloStrings){
    arregloDeRes=[];
    arregloStrings

        .forEach(
            ()=>
                (string)=>
                    const nombreArchivo="${indice}-${string}.txt";
                        const contenidoArchivo=string;
                        fs.writeFile(
    nombreArchivo,
        contenidoArchivo, err()=>
const resuesta={
        nombreArchivo:nombreArchivo,
    contenidoArchivo:contenidoArchivo,
    error: err
};
    arregloDeRes.push(resuesta);
    const terminiArreglo=arregloStrings.length==arregloDeRes.length()
)
        )

}

ejercicio(
    ["","",""],
    (arregloResuestas)=>console.log(arregloResuestas);
);