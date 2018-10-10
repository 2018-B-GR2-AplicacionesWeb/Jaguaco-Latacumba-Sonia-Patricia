// arreglo json si es valido en un arreglo js
var arreglo = [
    1, 2.2, "hola", true, false, {}, undefined, null, []];
var arregloNumeros = [1, 2, 3];
arregloNumeros[0];
arregloNumeros[1];
arregloNumeros[2];
arregloNumeros[3];
console.log("ejemlos de arreglos", arregloNumeros[0],
    arregloNumeros[1],
    arregloNumeros[2],
    arregloNumeros[3]);
arregloNumeros.push(5);//aumenta un elemneto mas en la osicion final
arregloNumeros.pop(1);//borra el elemento de la osicion 1
arregloNumeros.splice(0, 1);//borra desde la osicion 0, 1 elemento
arregloNumeros.splice(0, 0, 0);//borra desde la osicion 0, 0 elemento y anade 0
arregloNumeros.splice(2, 0, 1.5);//borra desde la osicion 2, 0 elemento y anade 5
arregloNumeros.slice(1,5);
var usuario = 1.5;
var indiceUsuario = arregloNumeros.indexOf(usuario);
arregloNumeros.splice(indiceUsuario);

console.log("inrime el indice del arreglojhj-->", arregloNumeros.slice(2,5));
console.log(arregloNumeros);

var arregloNotasRimerBimestre=[8.5,9,4];
var arregloNotasSegundoBimestre=[8.5,9,4];
//Destructuracion de arreglos
var arregloNotas2018B=[...arregloNotasRimerBimestre,...arregloNotasSegundoBimestre]
console.log("el arreglo de  destructuracion de arreglos",arregloNotas2018B);
//Destructuracin de objetos

var adrian2018A={
   sexualidad:0,
web:7
};
var adrian2018B={
    musica:7,
    moviles:8
};
var adrian={
    ...adrian2018A,...adrian2018B
};
console.log("restructuracion de objetos",adrian);