// scripts/templates/proposal.mjs
// Branded proposal template — dark navy/blue palette, title page, styled tables.
import { Document, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";
import { parseMarkdown } from "./shared.mjs";

const COLORS = {
  primary: "1a1a2e",
  accent: "0f3460",
  white: "FFFFFF",
  gray: "f5f5f5",
  border: "cccccc",
  muted: "666666",
};

function makeHeading(text, level) {
  const configs = {
    1: { size: 36, color: COLORS.primary, spaceBefore: 400 },
    2: { size: 28, color: COLORS.accent, spaceBefore: 300 },
    3: { size: 24, color: COLORS.accent, spaceBefore: 200 },
  };
  const { size, color, spaceBefore } = configs[level];
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size, color })],
    spacing: { before: spaceBefore, after: 150 },
  });
}

export async function build(content, meta) {
  return new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{
      properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
      children: [
        // Branded title page
        new Paragraph({
          children: [new TextRun({ text: "PROJECT PROPOSAL", bold: true, size: 48, color: COLORS.primary, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: meta.title, bold: true, size: 36, color: COLORS.accent, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Date: ${meta.date}`, size: 22, color: COLORS.muted }),
            new TextRun({ text: "     |     ", size: 22, color: COLORS.muted }),
            new TextRun({ text: "Prepared by: Tendou Souji (henshyn-ai)", size: 22, color: COLORS.muted }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "" })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.border } },
          spacing: { after: 200 },
        }),
        // Body — parsed from markdown
        ...(await parseMarkdown(content, makeHeading, {
          header: COLORS.accent,
          headerText: COLORS.white,
          rowAlt: COLORS.gray,
        }, COLORS.border)),
      ],
    }],
  });
}
