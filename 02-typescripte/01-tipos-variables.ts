//  01-tipos-variables.ts

// DUCK TYPING -> DUCK
let nombre:any = 'Adrian';
nombre = '1';
nombre = [];
let edad:number | string = 21.2;
edad = '12';
let casado:boolean = false;
casado = true;
casado = null;
casado = undefined;
const arregloNumeros: number[] = [1,2,3];
arregloNumeros.push(1);

const adrian:{ // Interface
    nombre:string;
    apellido?:string;
    edad?:21;
    estado?:'Activo' | 'Inactivo';
    saludar?:(nombre:string) => string
} = {  // JSON
    nombre:'Vicente',
    // edad:21,
    // casado:false,
    // fechaNacimiento: new Date(),
    saludar:(nombre)=>{
        return '';
    }
};

adrian.apellido = 'Eguez';

let fecha:Date = new Date();

fecha = new Date('2018-10-01');


const saludarDos = (nombre:string):string =>{
    return ''
};

function saludar(
    nombre:string,
    apellido?:string,
    ...otrosNombres: number[]
): string | number {
    return 'hola';
}

let respuestaSaludar = <number> saludar('Adrian','Eguez',1,1,2,3,4,5,6,7,8,9,0,7,5,4,3,2,1,1,12,2,3,4,5,67,8,9,0,0,2);

class UsuarioClase {
    nombre:string;
}
interface UsuarioInterface{
    nombre:string;
}
const usuario:UsuarioInterface = {
    nombre:'Adrian'
};

// $ tsc nombre-archivo.ts --target es2017}