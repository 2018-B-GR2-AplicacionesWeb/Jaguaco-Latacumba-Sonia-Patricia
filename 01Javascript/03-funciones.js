function sumar(numeroUno, nemeroDos){
    //validaciones
    var numeroUnoesNumber=typeof numeroUno=="number";
    var numeroDosesNumber=typeof nemeroDos=="number";
    if(numeroUnoesNumber && numeroDosesNumber){
        return numeroUno+nemeroDos;
    }else {return 0;}
    return numeroUno+nemeroDos;
};
//envio otros arametros
sumar("a",null);
sumar(1,2,3,4,5,6);
sumar();
console.log(sumar("a",null));
console.log(sumar("1",9));
console.log(sumar(1,19));
console.log(sumar(2,3));
console.log(sumar("a",null));
function saludar(nombre,funcionMensajeria){

    var saludo='Hola ${nombre.toUpperCase()}';
    funcionMensajeria(saludo);
    return saludo;


};

function imrimirConsola(texto){
    console.log(texto);
};
saludar("Vicente",imrimirConsola);
//funcion sin validaciones
sumarNumeros(1,2,3,4,5,6,7,8,9);
function sumarNumeros(...parametros){
    console.log("",parametros);

}
//Anonymous Functions
//asignar a variables


let edad=29;
edad=30;
const casado=false;//inmutable
const edadV2=30; //inmutabek
//edaV2=31;
const nombre="Adrian"
//nombre = eguez
const hijos=null;
hijos=1;
const  mascotas={};
//mascotas=1;
mascotas.cachetes="Cachetes";
mascotas.numero=1;
delete.mascotas..numero;

const carros={};//
//carros=1;/

//Anonymous
const saludaV2= function(){...};
    //imlementar
saludaV2;
//asignar a metodoo
const usuari{
    nombre:"Adrian";
    saludar:function(){
        return this.nombre;
    }
}
saludar(){};

// fat arrow functions ==>

const saludarV3= ()=>{
    //imlementacion
}
saludarV3();
const usuarioV2={
    nombre:"Vicente", saludar:()=>{}
} ()=>{

};

const saludarV3= ()=>{
    //imlementacion
}

const sumarDosNumerosV2= function(numeroUno,numeroDos){
    return numeroUno+numeroDos;

};
const sumarDosNumerosV4=(n1+n2) =>n1+n2;
const saludarV55=saludo =>{console.log(saludo)};


sumarNumeros(1,2,3,4,5,6);
console.log(saludar());//devuelve undefined xq no tiene un return o tio de funcion
console.log("imrime sumar numeros",sumarNumeros() );
console.log("");
