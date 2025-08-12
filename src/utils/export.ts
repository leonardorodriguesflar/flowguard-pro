import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { AbbottProcess } from "@/context/AbbottProcessContext";
import { ABBOTT_STEPS } from "@/context/AbbottProcessContext";

export function exportCSV(p: AbbottProcess) {
  const rows: string[] = [];
  rows.push(["ID", p.id].join(","));
  rows.push(["Criado em", new Date(p.createdAt).toLocaleString()].join(","));
  rows.push(["Concluído", p.closed ? "Sim" : "Não"].join(","));
  rows.push("");
  rows.push("Dados principais");
  const dataEntries = Object.entries(p.data || {});
  for (const [k, v] of dataEntries) rows.push(`${k},"${String(v).replace(/"/g, '""')}"`);
  rows.push("");
  rows.push("Histórico");
  rows.push("Data,Etapa,Responsável,Ação");
  for (const h of p.history.slice().reverse()) {
    const step = ABBOTT_STEPS.find(s => s.id === h.stepId)?.title || h.stepId;
    rows.push(`${new Date(h.when).toLocaleString()},${step},${h.responsible},${h.action}`);
  }
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${p.id}-resumo.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function exportPDF(p: AbbottProcess) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Resumo do Processo ${p.id}`, 14, 18);
  doc.setFontSize(10);
  doc.text(`Criado em: ${new Date(p.createdAt).toLocaleString()}`, 14, 26);
  doc.text(`Concluído: ${p.closed ? "Sim" : "Não"}`, 14, 32);

  // Tabela de dados
  const dataRows = Object.entries(p.data || {}).map(([k, v]) => [k, String(v)]);
  autoTable(doc, {
    startY: 38,
    head: [["Campo", "Valor"]],
    body: dataRows,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 144, 94] },
  });

  // Tabela de histórico
  const y = (doc as any).lastAutoTable?.finalY || 60;
  autoTable(doc, {
    startY: y + 8,
    head: [["Data", "Etapa", "Responsável", "Ação"]],
    body: p.history
      .slice()
      .reverse()
      .map((h) => [
        new Date(h.when).toLocaleString(),
        ABBOTT_STEPS.find(s => s.id === h.stepId)?.title || h.stepId,
        h.responsible,
        h.action,
      ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 144, 94] },
  });

  doc.save(`${p.id}-resumo.pdf`);
}
