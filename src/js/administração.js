// Pegando os elementos do HTML
const consultaBtn = document.querySelector('#btnConsulta');
const deletarBtn = document.querySelector('#btnDeletar');
const modalConsulta = document.querySelector('#modalConsulta');
const modalDeletar = document.querySelector('#modalDeletar');
const btnBuscarConsulta = document.querySelector('#btnBuscarC');
const btnDeletarUsuario = document.querySelector('#btnDeleção');
const fecharConsultaBtn = document.querySelector('#btnFecharC');
const fecharDeletarBtn = document.querySelector('#btnFecharD');

// Função para encontrar um usuário no localStorage
function encontrarUsuario(email) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.find(usuario => usuario.email === email);
}

// Abrir modal de consulta
consultaBtn.addEventListener('click', function () {
  modalConsulta.showModal();
});

// Abrir modal de deletar
deletarBtn.addEventListener('click', function () {
  modalDeletar.showModal();
});

// Evento de clique no botão de busca de usuário
btnBuscarConsulta.addEventListener('click', function (event) {
  event.preventDefault(); // Impedir o comportamento padrão de um evento no navegador

  const emailInput = document.querySelector("#emailConsulta").value.trim();
  const usuario = encontrarUsuario(emailInput);

  // Se o usuário foi encontrado, exibir os dados dele, senão, exibir uma mensagem de erro.
  if (usuario) {
    alert(`Usuário "${emailInput}" encontrado!\n\nDados:\nNome: ${usuario.nome}\nData de Nascimento: ${usuario.dataNasc}\nTelefone: ${usuario.telefone}\nEmail: ${usuario.email}`);
  } else {
    alert(`Usuário "${emailInput}" não encontrado!`);
  }
});

// Evento de clique no botão de deleção de usuário
btnDeletarUsuario.addEventListener('click', function (event) {
  event.preventDefault();

  const emailInput = document.querySelector("#emailDeletar").value.trim();
  const usuario = encontrarUsuario(emailInput);
  
  // Se o usuário foi encontrado, deletar ele, senão, exibir uma mensagem de erro.
  if (usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(user => user.email !== emailInput);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(`Usuário "${usuario.nome}" deletado com sucesso!`);
    if (usuarios.length === 0) { // Se não houver mais usuários, remover a chave 'usuarios' do localStorage
      localStorage.removeItem('usuarios');
    }
  } else {
    alert(`Usuário "${emailInput}" não encontrado!`);
  }
  
});

// Fecha o Modal de Consulta
fecharConsultaBtn.addEventListener('click', function () {
  modalConsulta.close();
});
// Fecha o Modal de Deletar
fecharDeletarBtn.addEventListener('click', function () {
  modalDeletar.close();
});


