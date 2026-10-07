// Pegando os elementos do HTML
const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");

const btnCalcular = document.getElementById("btnCalcular");

const resultado = document.getElementById("resultado");
const listaPessoas = document.getElementById("listaPessoas");
const totalPessoas = document.getElementById("totalPessoas");

// Array para guardar as pessoas
const pessoas = [];

// Evento do botão
btnCalcular.addEventListener("click", function () {
  // Pegando os valores
  const nomePessoa = nome.value;
  const pesoPessoa = Number(peso.value);
  const alturaPessoa = Number(altura.value);

  // Verificando os dados
  if (nomePessoa === "" || pesoPessoa <= 0 || alturaPessoa <= 0) {
    resultado.innerHTML = "Preencha todos os campos.";
    return;
  }

  // Convertendo altura para metros
  const alturaMetros = alturaPessoa / 100;

  // Calculando o IMC
  const imc = pesoPessoa / (alturaMetros * alturaMetros);

  // Classificação
  let classificacao;

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso adequado";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }

  // Mostrando o resultado
  resultado.innerHTML = `
        <h2>Olá, ${nomePessoa}!</h2>
        <p>Seu IMC é: <strong>${imc.toFixed(2)}</strong></p>
        <p>${classificacao}</p>
    `;

  // Criando uma pessoa
  const pessoa = {
    nome: nomePessoa,
    peso: pesoPessoa,
    altura: alturaMetros,
    imc: imc,
    classificacao: classificacao,
  };

  // Adicionando ao array
  pessoas.push(pessoa);

  // Atualizando a lista
  mostrarPessoas();

  // Limpando os campos
  nome.value = "";
  peso.value = "";
  altura.value = "";

  nome.focus();
});

// Função para mostrar as pessoas
function mostrarPessoas() {
  listaPessoas.innerHTML = "";

  pessoas.forEach(function (pessoa, index) {
    listaPessoas.innerHTML += `
            <div class="pessoa">

                <h3>${pessoa.nome}</h3>

                <p>Peso: ${pessoa.peso} kg</p>

                <p>Altura: ${pessoa.altura.toFixed(2)} m</p>

                <p>
                    IMC:
                    <strong>${pessoa.imc.toFixed(2)}</strong>
                </p>

                <p>${pessoa.classificacao}</p>

                <button
                    class="excluir"
                    onclick="excluirPessoa(${index})">
                    Excluir
                </button>

            </div>
        `;
  });

  // Atualizando o contador
  totalPessoas.textContent = pessoas.length;
}

// Função para excluir uma pessoa
function excluirPessoa(index) {
  pessoas.splice(index, 1);

  mostrarPessoas();
}
