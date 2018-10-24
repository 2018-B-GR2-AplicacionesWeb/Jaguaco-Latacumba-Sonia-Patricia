

const arreglo =['A','B','C'];


const resuestaMa=arreglo
    .map((value => { return value.toUpperCase();})

);
console.log(resuestaMa)



const arrgloNumeros=[2,4,3,6,7,1,10,8,9,5];
const resuestaFilter=arrgloNumeros
    .filter((valor)=>{return valor %2==0})
console.log(resuestaFilter);


arrgloNumeros.indexOf();
if(0=="1"){
    console.log("SI");
}else {console.log("NO")}


//diferencia entre el findindex y indexof el uno recibe el objeto comleto y el otro arte del objeto

//findindex devuelve el indice
//find devuelve el objeto

//FIND
 const  resuestaFind=arrgloNumeros.find(value =>{return value===7});
console.log(resuestaFind);


//find

//some
const resuestSome =arrgloNumeros .some((value => {return value>10}));
console.log("ejemlos de some  -->"+resuestSome);

//every esta sentencia dice si todos son mayores al valor dado
const resuestEvery =arrgloNumeros .every((value => {return value>1}));
console.log("ejemlos de every -->"+resuestEvery);

//reduce esta oeraciones entre todos recibe dos arametro el rimero es una funcion el segundo es un valor
const resuestReduce =arrgloNumeros .reduce((valueacumulado,value) => {return valueacumulado-value},100);
console.log("ejemlos de resuestReduce -->"+resuestReduce);


const resuestReduceV2 =arrgloNumeros .reduceRight((a,b) => a+b,100);
console.log("ejemlos de resuestReduceV2 -->"+resuestReduceV2);


//sort cambia e arreglo





const  arregloNumeroClonados = JSON.parse(JSON.stringify(arrgloNumeros));  //arreglo cliando
console.log(arregloNumeroClonados);

arrgloNumeros.sort((a,b)=>a-b);
console.log("imrime el arreglo de  umeros  sort",arrgloNumeros);


