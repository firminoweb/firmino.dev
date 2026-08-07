/**
 * Gera public/cv-joao-firmino-full-stack.pdf a partir de src/data/curriculo.ts.
 *
 * A fonte da verdade é o mesmo módulo que alimenta a página /joao, então o PDF
 * e a página não têm como divergir. Rode com `yarn build:cv` depois de mexer
 * no currículo.
 *
 * Helvetica é a fonte embutida do pdfkit e cobre WinAnsi, o que dá conta dos
 * acentos do português sem precisar carregar arquivo de fonte.
 */
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import PDFDocument from "pdfkit";
import {
  PERSON,
  PERSON_SUMMARY,
  CAREER,
  EARLIER_ROLES,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
} from "../src/data/curriculo";
import { CONTACT } from "../src/data/portfolio";

const OUT = resolve(process.cwd(), "public/cv-joao-firmino-full-stack.pdf");

const INK = "#111111";
const MUTED = "#555555";
const ACCENT = "#1f3a8a";
const RULE = "#cccccc";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 48, bottom: 48, left: 52, right: 52 },
  info: {
    Title: `Currículo · ${PERSON.name}`,
    Author: PERSON.name,
    Subject: PERSON.role,
    Keywords: SKILL_GROUPS.flatMap((g) => g.items).slice(0, 30).join(", "),
  },
});

doc.pipe(createWriteStream(OUT));

const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;

/** Quebra de página antes de um bloco que não caberia inteiro no que resta. */
function ensure(space: number) {
  if (doc.y + space > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function sectionTitle(label: string) {
  ensure(48);
  doc.moveDown(0.7);
  // Sem characterSpacing de propósito: ele faz o extrator de texto quebrar a
  // palavra ("R ESUM O"), e currículo precisa ser lido por ATS de recrutador.
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text(label.toUpperCase());
  doc.moveDown(0.25);
  const y = doc.y;
  doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.margins.left + W, y)
    .lineWidth(0.7).strokeColor(RULE).stroke();
  doc.moveDown(0.55);
}

/**
 * Recuo pendente de verdade: o marcador fica na coluna da esquerda e a linha
 * que quebra alinha sob o texto, não sob o bullet. `indent` do pdfkit só
 * empurra a primeira linha, por isso o marcador é desenhado à parte.
 */
function bullets(items: string[]) {
  const left = doc.page.margins.left;
  const gutter = 12;
  for (const item of items) {
    ensure(28);
    const y = doc.y;
    doc.font("Helvetica").fontSize(9).fillColor(INK);
    doc.text("•", left + 2, y, { width: gutter, lineBreak: false });
    doc.text(item, left + gutter, y, { width: W - gutter, align: "left", lineGap: 1.2 });
    doc.moveDown(0.18);
  }
  doc.x = left;
}

/* ── Cabeçalho ─────────────────────────────────────────────────────────── */

doc.font("Helvetica-Bold").fontSize(23).fillColor(INK).text(PERSON.name);
doc.moveDown(0.12);
doc.font("Helvetica").fontSize(12).fillColor(MUTED).text(PERSON.role);
doc.moveDown(0.4);

// joao@ e não falecom@: este documento fala na voz da pessoa, não da empresa.
doc.fontSize(8.5).fillColor(MUTED).text(
  `${PERSON.email}  |  ${CONTACT.phone}  |  ${PERSON.location}`,
);
doc.text(
  `LinkedIn: ${PERSON.linkedin.replace("https://www.", "")}  |  GitHub: ${PERSON.github.replace("https://", "")}`,
);

/* ── Resumo ────────────────────────────────────────────────────────────── */

sectionTitle("Resumo profissional");
doc.font("Helvetica").fontSize(9).fillColor(INK);
for (const p of PERSON_SUMMARY) {
  doc.text(p, { width: W, align: "justify", lineGap: 1.4 });
  doc.moveDown(0.35);
}

/* ── Experiência ───────────────────────────────────────────────────────── */

sectionTitle("Experiência profissional");
CAREER.forEach((job, i) => {
  ensure(90);
  if (i > 0) doc.moveDown(0.45);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK)
    .text(`${job.role}  •  ${job.company}`);
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(MUTED)
    .text(job.location ? `${job.period}  ·  ${job.location}` : job.period);
  doc.moveDown(0.3);
  bullets(job.highlights);
  if (job.stack?.length) {
    doc.font("Helvetica").fontSize(8.5).fillColor(MUTED)
      .text(`Stack: ${job.stack.join(", ")}.`, { width: W });
  }
});

/* ── Experiências anteriores ───────────────────────────────────────────── */

sectionTitle("Experiências anteriores");
EARLIER_ROLES.forEach((r) => {
  ensure(34);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK)
    .text(`${r.role}  •  ${r.company}`, { continued: false });
  doc.font("Helvetica-Oblique").fontSize(8).fillColor(MUTED).text(r.period);
  if (r.detail) {
    doc.font("Helvetica").fontSize(8.5).fillColor(INK).text(r.detail, { width: W });
  }
  doc.moveDown(0.28);
});

/* ── Habilidades ───────────────────────────────────────────────────────── */

sectionTitle("Habilidades técnicas");
SKILL_GROUPS.forEach((g) => {
  ensure(26);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK)
    .text(`${g.title}: `, { continued: true });
  doc.font("Helvetica").fillColor(INK).text(`${g.items.join(", ")}.`, { width: W });
  doc.moveDown(0.22);
});

/* ── Formação, certificações e idiomas ─────────────────────────────────── */

sectionTitle("Formação");
EDUCATION.forEach((e) => {
  ensure(26);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(e.degree);
  doc.font("Helvetica").fontSize(8.5).fillColor(MUTED)
    .text(`${e.school}${e.location ? `, ${e.location}` : ""}  ·  ${e.year}`);
  doc.moveDown(0.28);
});

sectionTitle("Certificações");
bullets(CERTIFICATIONS);

sectionTitle("Idiomas");
doc.font("Helvetica").fontSize(9).fillColor(INK);
LANGUAGES.forEach((l) => {
  ensure(18);
  doc.font("Helvetica-Bold").text(`${l.name}: `, { continued: true });
  doc.font("Helvetica").text(l.level);
});

doc.end();

console.log(`CV gerado em ${OUT}`);
