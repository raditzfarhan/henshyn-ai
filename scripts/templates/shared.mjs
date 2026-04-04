// scripts/templates/shared.mjs
// Shared markdown parsing and docx block builders used by all templates.
import {
  Paragraph, Table, TableRow, TableCell,
  TextRun, WidthType, ShadingType, BorderStyle,
} from "docx";

// Parse inline markdown: **bold**, *italic*, plain text
export function parseInline(text) {
  const runs = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|([^*]+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m[1]) runs.push(new TextRun({ text: m[1], bold: true, size: 22 }));
    else if (m[2]) runs.push(new TextRun({ text: m[2], italics: true, size: 22 }));
    else if (m[3]) runs.push(new TextRun({ text: m[3], size: 22 }));
  }
  return runs.length ? runs : [new TextRun({ text, size: 22 })];
}

export function makeParagraph(text) {
  return new Paragraph({ children: parseInline(text), spacing: { after: 100 } });
}

export function makeBullet(text) {
  return new Paragraph({ children: parseInline(text), bullet: { level: 0 }, spacing: { after: 80 } });
}

export function makeDivider(borderColor) {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: borderColor } },
    spacing: { after: 200 },
  });
}

// Build a docx Table from a 2D array of cell strings
// allRows[0] = header row, rest = data rows
// colors: { header, headerText, rowAlt }
export function makeTable(allRows, colors) {
  const [headerRow, ...dataRows] = allRows;
  const headers = headerRow.map(h => h.replace(/\*\*/g, "").trim());

  const docHeaderRow = new TableRow({
    children: headers.map(h => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 20, color: colors.headerText })],
      })],
      shading: { type: ShadingType.SOLID, color: colors.header, fill: colors.header },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
    })),
    tableHeader: true,
  });

  const docDataRows = dataRows.map((row, i) => new TableRow({
    children: row.map(cell => new TableCell({
      children: [new Paragraph({ children: parseInline(cell.trim()) })],
      shading: i % 2 === 0
        ? { type: ShadingType.SOLID, color: colors.rowAlt, fill: colors.rowAlt }
        : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
    })),
  }));

  return new Table({
    rows: [docHeaderRow, ...docDataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// Parse full markdown content into docx block elements.
// headingFn(text, level) → Paragraph  — provided by each template for custom styling
// tableColors → { header, headerText, rowAlt }
// borderColor → hex string for dividers
// Numbered lists are rendered as bullets (avoids docx Document-level numbering config complexity).
// Unsupported elements (code blocks, blockquotes, images) → plain paragraph.
export function parseMarkdown(content, headingFn, tableColors, borderColor) {
  const lines = content.split("\n");
  const elements = [];
  let tableBuffer = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("|")) {
      if (/^\|[\s\-:|]+\|/.test(trimmed)) continue; // skip separator rows
      tableBuffer.push(trimmed.split("|").slice(1, -1).map(c => c.trim()));
      inTable = true;
      continue;
    }

    if (inTable) {
      if (tableBuffer.length > 1) elements.push(makeTable(tableBuffer, tableColors));
      tableBuffer = [];
      inTable = false;
    }

    if (!trimmed) { elements.push(new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } })); continue; }
    if (trimmed === "---") { elements.push(makeDivider(borderColor)); continue; }
    if (trimmed.startsWith("### ")) { elements.push(headingFn(trimmed.slice(4), 3)); continue; }
    if (trimmed.startsWith("## ")) { elements.push(headingFn(trimmed.slice(3), 2)); continue; }
    if (trimmed.startsWith("# ")) { elements.push(headingFn(trimmed.slice(2), 1)); continue; }
    if (trimmed.startsWith("- ")) { elements.push(makeBullet(trimmed.slice(2))); continue; }
    if (/^\d+\.\s/.test(trimmed)) { elements.push(makeBullet(trimmed.replace(/^\d+\.\s/, ""))); continue; }
    // Everything else (code blocks, blockquotes, horizontal rules, images) → plain paragraph
    elements.push(makeParagraph(trimmed));
  }

  if (inTable && tableBuffer.length > 1) elements.push(makeTable(tableBuffer, tableColors));
  return elements;
}
