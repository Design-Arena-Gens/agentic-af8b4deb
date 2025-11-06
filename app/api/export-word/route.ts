import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun } from 'docx';

export const dynamic = 'force-dynamic';

function h1(text: string) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1 });
}

function spacer(lines = 1) {
  return Array.from({ length: lines }).map(() => new Paragraph({ text: '' }));
}

function table(headers: string[], rows: number, cols: number) {
  const headerRow = new TableRow({
    children: headers.map((h) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
    })),
  });

  const bodyRows = Array.from({ length: rows }).map(() => new TableRow({
    children: Array.from({ length: cols }).map(() => new TableCell({ children: [new Paragraph('')] })),
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...bodyRows],
  });
}

export async function GET() {
  const doc = new Document({
    sections: [
      {
        children: [
          h1('Fitness Tracker'),
          ...spacer(1),
          new Paragraph('A printable and editable template for daily tracking.'),
        ],
      },
      {
        children: [
          h1('Workouts'),
          ...spacer(1),
          table(['Date', 'Exercise', 'Sets', 'Reps', 'Weight (kg)', 'Notes'], 12, 6),
        ],
      },
      {
        children: [
          h1('Nutrition'),
          ...spacer(1),
          table(['Date', 'Meal', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Notes'], 12, 7),
        ],
      },
      {
        children: [
          h1('Sleep'),
          ...spacer(1),
          table(['Date', 'Hours', 'Quality (1-5)', 'Notes'], 14, 4),
        ],
      },
      {
        children: [
          h1('Progress'),
          ...spacer(1),
          table(['Date', 'Weight (kg)', 'Body Fat (%)', 'Steps', 'Notes'], 14, 5),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const uint8 = new Uint8Array(buffer);
  return new Response(uint8, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="Fitness_Tracker_Template.docx"',
    },
  });
}
