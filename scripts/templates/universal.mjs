// scripts/templates/universal.mjs
// Fallback template — neutral styling for any output type without a dedicated template.
import { Document, Paragraph, TextRun } from "docx";
import { parseMarkdown } from "./shared.mjs";

const COLORS = {
  heading: { 1: "1a1a2e", 2: "333333", 3: "555555" },
  tableHeader: "444444",
  tableHeaderText: "FFFFFF",
  tableRowAlt: "f5f5f5",
  border: "cccccc",
};

function makeHeading(text, level) {
  const sizes = { 1: 36, 2: 28, 3: 24 };
  const spaceBefore = { 1: 400, 2: 300, 3: 200 };
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: sizes[level], color: COLORS.heading[level] })],
    spacing: { before: spaceBefore[level], after: 150 },
  });
}

export async function build(content, meta) {
  return new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{
      properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
      children: [
        new Paragraph({
          children: [new TextRun({ text: meta.title, bold: true, size: 40, color: COLORS.heading[1] })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: meta.date, size: 20, color: "888888" })],
          spacing: { after: 400 },
        }),
        ...(await parseMarkdown(content, makeHeading, {
          header: COLORS.tableHeader,
          headerText: COLORS.tableHeaderText,
          rowAlt: COLORS.tableRowAlt,
        }, COLORS.border)),
      ],
    }],
  });
}
