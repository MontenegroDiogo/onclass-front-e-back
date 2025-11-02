async function gerarPDF(tipo) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const titulo = tipo === "confirmada" ? "Presença Confirmada" : tipo === "naoConfirmada" ? "Presença Não Confirmada": "Presença Justificada";
  const lista = document.getElementById(tipo).getElementsByTagName("li");

  // === Pegar data e hora atuais ===
  const agora = new Date();
  const dataGeracao = agora.toLocaleDateString("pt-BR");
  const horaGeracao = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  // === Cabeçalho azul arredondado ===
  doc.setFillColor(11, 44, 102); // Azul escuro
  doc.roundedRect(10, 10, 190, 15, 5, 5, "F");

  // === Título centralizado ===
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RELATÓRIO DE PRESENÇA", 105, 20, { align: "center" });

  // === Título da seção ===
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(titulo, 20, 40);

  // === Data e hora de geração ===
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Relatório gerado em: ${dataGeracao} às ${horaGeracao}`, 20, 47);

  // === Lista de nomes ===
  let y = 60;
  for (let i = 0; i < lista.length; i++) {
    doc.text(`• ${lista[i].textContent}`, 25, y);
    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 30;
    }
  }

  // === Linha azul no rodapé (opcional, pra destacar) ===
  doc.setDrawColor(11, 44, 102);
  doc.setLineWidth(0.5);
  doc.line(10, 280, 200, 280);

  // === Rodapé com marca OnClass ===
  doc.setFontSize(10);
  doc.setTextColor(11, 44, 102);
  doc.text("OnClass", 200 - 10, 290, { align: "right" });

  // === Salvar o arquivo ===
  const nomeArquivo = `Relatorio_${titulo.replace(/\s+/g, "_")}_${dataGeracao}.pdf`;
  doc.save(nomeArquivo);
}
