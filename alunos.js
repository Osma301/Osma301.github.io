let form = document.getElementById('cadastroAluno');
form.addEventListener('submit', function () {
  let storage = localStorage.ALUNOS ? JSON.parse(localStorage.ALUNOS) : [];

  let nomeAluno = document.querySelector('.nomeAluno').value;
  let nota1 = document.querySelector('.nota1').value;
  let nota2 = document.querySelector('.nota2').value;
  let nota3 = document.querySelector('.nota3').value;
  let media = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3);
  situacao = '';
  let aprov = '';
  let reprov = '';
  if (media > 7 || media == 10) {
    aprov = 'Aluno Aprovado &#x2714';
  } else {
    reprov = 'Aluno reprovado &#x274c';
  }
  
  let aluno = {
    nome: nomeAluno,
    nota_1: nota1,
    nota_2: nota2,
    nota_3: nota3,
    mediatotal: media,
    aprov: aprov,
    reprov: reprov,
  };

  let submitButton = document.querySelector('.enviar').value;
  if (!submitButton) {
    storage.push(aluno);
    msgSuccess = 'Cadastro do aluno efetuado com sucesso';
    localStorage.setItem('ALUNOS', JSON.stringify(storage));
  } else {
    let idAluno = document.querySelector('#editarAluno').value;
    storage[idAluno] = aluno;
    msgSuccess = 'Cadastro do aluno editado com sucesso';
  }
  localStorage.setItem('ALUNOS', JSON.stringify(storage));
  alert(msgSuccess);
  //Limpar os formes
  form.reset();
  document.querySelector('.enviar').value = '';
  tabelaAlunos();
});

function tabelaAlunos() {
  if (localStorage.ALUNOS) {
    let listadoAlunos = localStorage.ALUNOS
      ? JSON.parse(localStorage.ALUNOS)
      : [];
    let structure = '';
    for (const i in listadoAlunos) {
      structure += `
        <tr>
            <td> ${listadoAlunos[i].nome} </td>
            <td> ${listadoAlunos[i].nota_1},${listadoAlunos[i].nota_2},${
        listadoAlunos[i].nota_3
      }</td>
            <td>${listadoAlunos[i].mediatotal.toFixed(2)}</td>
            <td>${listadoAlunos[i].aprov}</td>
            <td>${listadoAlunos[i].reprov}</td>
            <td><a href="#" onclick="editarItem(${i})">Editar</a></td>
            <td><a href="#" onclick="deleteItem(${i})">Delete</a></td>
            </tr>
        `;
      document.querySelector('table tbody').innerHTML = structure;
    }
  } else {
    estructura = `<tr>
        <td colspan="7">Não existem Notas cadastradas</td>
    </tr>
    `;
    document.querySelector('table tbody').innerHTML = estructura;
  }
}
function deleteItem(id) {
  let dados = localStorage.ALUNOS ? JSON.parse(localStorage.ALUNOS) : [];
  dados.splice(id, 1);
  if (dados.length > 0) {
    localStorage.setItem('ALUNOS', JSON.stringify(dados));
  } else {
    localStorage.setItem('ALUNOS', '');
  }
  alert('Cadastro deletado con sucesso');
  tabelaAlunos();
  return false;
}
function editarItem(id) {
  let dados = localStorage.ALUNOS ? JSON.parse(localStorage.ALUNOS) : [];

  let dadosSeleccionado = dados[id];
  document.querySelector('.nomeAluno').value = dadosSeleccionado.nome;
  document.querySelector('.nota1').value = dadosSeleccionado.nota_1;
  document.querySelector('.nota2').value = dadosSeleccionado.nota_2;
  document.querySelector('.nota3').value = dadosSeleccionado.nota_3;

  // adicionar controle de edição no button
  document.querySelector('button').value = 'editar';
  document.querySelector('#editarAluno').value = id;
  return false;
}
tabelaAlunos();
