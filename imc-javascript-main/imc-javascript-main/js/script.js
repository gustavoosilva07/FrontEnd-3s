async function calcular(){
    //Pegar os valores dos campos
    const nome = document.getElementById("nome").value
    const altura = document.getElementById("altura").value
    const peso = document.getElementById("peso").value

    //O trim tira os espasso no final e no inico do texto
    if (nome.trim().length == 0  || altura.trim().length == 0 || peso.trim().length == 0){
        alert("Preencher todos os campos")
        return false
    }
    console.log("Liberado para cadastrar")
    
    //calcular o imc
    const IMC = calcularIMC(peso, altura)
    console.log(IMC)
    
    //gerar o texto da situação
    const textoSituacao = gerarSituacao(IMC);
    console.log(textoSituacao)

    const objIMC = {
        nome: nome,
        altura: altura,
        peso: peso,
        IMC: IMC,
        situação: textoSituacao 
    };
    
    //Cadastrar na API
    const dadosGravados = await cadastrarAPI(objIMC)

    // Ajuste para evitar o erro de 'in' operator
    if("erro" in dadosGravados){
        alert(dadosGravados.erro)
    }else {
        carregarDados()
    }
}

async function carregarDados(){
    alert("Carregando dados")
    const retorno = await fetch(`http://localhost:3000/imc`)
    const dados = await retorno.json()
    console.log(dados)

    const tabela = document.getElementById("cadastro");
    tabela.innerHTML = "";
    
    dados.sort((a,b) => 
        a.nome.localeCompare(b.nome)
    )

    dados.forEach(pessoa => {
            document.getElementById("cadastro").innerHTML +=
            `<tr>
                <th>${pessoa.nome}</th>
                <th>${pessoa.altura}</th>
                <th>${pessoa.peso}</th>
                <th>${pessoa.IMC.toFixed(2)}</th>
                <th>${pessoa.situação}</th>
            </tr>`
        });
}


async function cadastrarAPI(objCadastro){
    try {
        const retorno = await fetch("http://localhost:3000/imc", {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers:{
                 "Content-Type" : "application/json; charset=UTF-8"
            }
        })

        const dadosGravados = await retorno.json()
        console.log(dadosGravados)
        return dadosGravados; // AJUSTE: Agora a função retorna o que recebeu da API

    } catch(erro) {
        console.log(erro)
        return {
            erro: "Problemas para gravar na API"
        }
    }
}

function mostrarNaTela(objCadastro){
    document.getElementById("cadastro").innerHTML +=
                `<tr>
                    <th>${objCadastro.nome}</th>
                    <th>${objCadastro.altura}</th>
                    <th>${objCadastro.peso}</th>
                    <th>${objCadastro.IMC}</th>
                    <th>${objCadastro.situação}</th>
                </tr>`
}

function calcularIMC(peso, altura){
    return peso / (altura * altura)
}

function gerarSituacao(IMC){
    if( IMC <  16){
        return("Magreza grave")
    }else if(IMC < 17){
        return("Magreza moderada")
    }else if(IMC < 18.5){
        return("Magreza leve")
    }else if(IMC < 25){
        return("Saudável")
    }else if(IMC < 30){
        return("Sobrepeso")
    }else if(IMC < 35){
        return("Obesidade Grau I")
    }else if(IMC < 40){
        return("Obesidade Grau II")
    }else {
        return("Obesidade Grau III")
    }
}