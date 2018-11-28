const fs = require('fs');

// Iniciando datos


export  const AppendFile = (nombreArchivo, contenido,replace?:boolean)=>{
    // @ts-ignore
    return  new Promise(
        (resolve,reject) => {

            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );

                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            //contenidoArchivo+contenido,
                            replace == true? contenido:contenidoArchivo+contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );
                    }
                }
            );

        }
    );
}
// Cargar datos
export  const GetData  = (nombreArchivo)=>{
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error){
                        reject(error);
                    }else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )
};
export let producto=[];
GetData('./articulos')
    .then(
        (contenido)=>{

            String(contenido).split("||").forEach(
                (value)=>{

                    producto.push(value);
                }
            )
        }
    );