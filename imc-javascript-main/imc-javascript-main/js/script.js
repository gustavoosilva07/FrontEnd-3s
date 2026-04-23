function calcular(){
//pegar os valores do campo
//nome
const nome = document.getElementById("nome").value;
//Altura
const altura = parseFloat(document.getElementById("altura").value);
//Peso
const peso = parseFloat(document.getElementById("peso").value);

console.log(altura);
console.log(peso);

//verificar se tem campo sem preencher
//dar mensagem se tiver faltando sem preencher
if(nome.trim().length == 0 || altura.trim().length == 0 || personalbar.trim().length == 0){

     alert("Preencher todos os campos");
     return false;
}
     console.log("Liberado para cadastrar");
}
