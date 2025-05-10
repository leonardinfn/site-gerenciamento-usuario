// Botão de cadastro 
const cadastroBtn = document.querySelector('#btnCadastrar');

// Função para criar um objeto usuário usando Factory
function usuarioFactory(nome, dataNasc, telefone, email) {
  return new usuario(nome, dataNasc, telefone, email);
}

// Classe usuário
class usuario {
  constructor(nome, dataNasc, telefone, email) {
    this.nome = nome;
    this.dataNasc = dataNasc;
    this.telefone = telefone;
    this.email = email;
  }
}

// Função para limpar os campos do formulário
function limparCampos() {
  document.querySelector("#meunome").value = "";
  document.querySelector("#dataNasc").value = "";
  document.querySelector("#telefone").value = "";
  document.querySelector("#meuemail").value = "";
}

// Função para dar segurança e validar os campos do formulário
function validarUsuario(nome, dataNasc, telefone, email) {
  
  const hoje = new Date();
  const aniversarioData = new Date(dataNasc);
  let partesNome = nome.trim().split(" ").filter(parte => parte.length > 0);

  if (nome === "" || dataNasc === "" || telefone === "" || email === "") {
    alert("Preencha todos os campos!");
    return false;
  }

  else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("E-mail inválido!");
    return false;
  }

  else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone)) { //ChatGPT me ajudou a criar esse REGEX.
    alert("Telefone inválido!");
    return false;
  }

  else if (aniversarioData > hoje) {
    alert("Data de nascimento inválida!");
    return false;
  }

  else if (partesNome.length < 2 || partesNome[0].length < 3) {
    alert("Nome e sobrenome devem ser preenchidos!");
    return false;
  }

  return true;
}

// Função para salvar o usuário no localStorage
function salvarUsuario(user) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Evento de clique no botão de cadastro de usuário
cadastroBtn.addEventListener("click", function(event) {
  event.preventDefault(); // Impedir o comportamento padrão de um evento no navegador

// Pegando os valores dos campos do formulário
  const nome = document.querySelector("#meunome").value.trim().toUpperCase();
  const dataNasc = document.querySelector("#dataNasc").value;
  const telefone = document.querySelector("#telefone").value;
  const email = document.querySelector("#meuemail").value;

// Validando os campos, caso algum esteja inválido, a função retorna
  if (!validarUsuario(nome, dataNasc, telefone, email)) {
    return;
  }

// Criando o objeto usuário
  const user = usuarioFactory(nome, dataNasc, telefone, email);
  salvarUsuario(user);

  limparCampos();
  
  alert(`Usuário "${user.nome}" cadastrado com sucesso!`);
  console.table({ nome, telefone, email });
});
