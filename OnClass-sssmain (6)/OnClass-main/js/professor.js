const modalQrcode = document.getElementById("modal-qrcode");
const closeModal = document.getElementById("close-modal");
const infoAula = document.getElementById("infoAula");
const qrcodeDiv = document.getElementById("qrcode");
const baixarBtn = document.getElementById("baixarBtn");

const tabela = document.querySelector("#tabelaHorarios tbody");
const botaoAdicionar = document.querySelector("#adicionarHorario");

// Dados simulados
const horarios = [
  { dia: "Segunda-feira", horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"}
  
];

// Renderizar tabela
function renderTabela() {
  tabela.innerHTML = "";
  horarios.forEach((h, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.dia}</td>
      <td>${h.horario}</td>
      <td>${h.curso}</td>
      <td>${h.disciplina}</td>
      <td>${h.turma}</td>
      <td>${h.professor}</td>
    `;
    // Quando clicar em uma linha, gera o QR Code
    row.addEventListener("click", () => gerarQRCode(h));
    tabela.appendChild(row);
  });
}

// Adicionar novo horário
botaoAdicionar.addEventListener("click", () => {
  const novo = {
    dia: prompt("Dia da semana:"),
    horario: prompt("Horário:"),
    curso: prompt("Curso:"),
    turma: prompt("Turma:"),
    professor: prompt("Professor:"),
  };
  if (novo.dia && novo.horario) {
    horarios.push(novo);
    renderTabela();
  }
});

// Função para gerar o QR Code
function gerarQRCode(aula) {
  modalQrcode.style.display = "flex";
  infoAula.innerHTML = `
    <p><strong>Dia:</strong> ${aula.dia}</p>
    <p><strong>Horário:</strong> ${aula.horario}</p>
    <p><strong>Curso:</strong> ${aula.curso}</p>
    <p><strong>Turma:</strong> ${aula.turma}</p>
    <p><strong>Professor:</strong> ${aula.professor}</p>
  `;

  qrcodeDiv.innerHTML = ""; // limpa QR anterior
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  const dados = `
Aula: ${aula.dia}
Data: ${dataAtual}
Horário: ${aula.horario}
Curso: ${aula.curso}
Turma: ${aula.turma}
Professor: ${aula.professor}
  `;

  new QRCode(qrcodeDiv, {
    text: dados,
    width: 180,
    height: 180,
  });

  // Botão de download
  baixarBtn.onclick = () => {
    const img = qrcodeDiv.querySelector("img");
    if (img) {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = `QRCode_${aula.dia}.png`;
      link.click();
    }
  };
}

// Fechar modal
closeModal.addEventListener("click", () => {
  modalQrcode.style.display = "none";
});

// Fechar clicando fora do modal
window.addEventListener("click", (e) => {
  if (e.target === modalQrcode) {
    modalQrcode.style.display = "none";
  }
});

renderTabela();

const btnAddJustificativa = document.getElementById('btn-add-justificativa');
const modalJustificativa = document.getElementById('modal-justificativa');
const fecharModal = document.getElementById('fechar-modal-justificativa');
const formJustificativa = document.getElementById('form-justificativa');
const salvarJustificativa = document.getElementById('salvar-justificativa');

// Abrir modal
btnAddJustificativa.addEventListener('click', () => {
  modalJustificativa.style.display = 'flex';
});

// Fechar modal pelo X
fecharModal.addEventListener('click', () => {
  modalJustificativa.style.display = 'none';
});

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
  if (e.target === modalJustificativa) {
    modalJustificativa.style.display = 'none';
  }
});