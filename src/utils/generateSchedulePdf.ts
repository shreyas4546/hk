import { EVENT_DETAILS, OFFICIAL_SCHEDULE } from "../data/eventData";

export function generateSchedulePdf(): void {
  const content: string[] = [];
  const add = (str: string) => content.push(str);

  // Document Title & Kicker
  add("BT");
  add("/F1 18 Tf 0.0 0.78 0.91 rg"); // Electric Cyan
  add("50 780 Td (HACKIGNITE 1.0 - OFFICIAL 24-HOUR EVENT TIMETABLE) Tj");
  add("ET");

  add("BT");
  add("/F1 11 Tf 0.1 0.1 0.1 rg");
  add("50 758 Td (Department of Computer Science & Engineering [CSE/AI&ML]) Tj");
  add("/F2 9.5 Tf 0.35 0.35 0.35 rg");
  add("0 -15 Td (Jain College of Engineering and Technology, Hubballi - 580031) Tj");
  add("0 -14 Td (Official Dates: 12-13 December 2026  |  Timezone: India Standard Time [IST / UTC+5:30]) Tj");
  add("ET");

  // Cyan divider line
  add("0.0 0.78 0.91 RG 1.5 w");
  add("50 710 m 545 710 l S");

  // Day 01 Section
  add("BT");
  add("/F1 12.5 Tf 0.05 0.15 0.25 rg");
  add("50 686 Td (DAY 01 · 12 DECEMBER 2026 - OPENING & SPRINT COMMENCEMENT) Tj");
  add("ET");

  const day1Events = OFFICIAL_SCHEDULE[0]?.events || [];
  let y = 666;

  for (const ev of day1Events) {
    add("BT");
    add("/F1 9.5 Tf 0.0 0.55 0.75 rg");
    add(`50 ${y} Td (${ev.timeRange.replace(/[()]/g, "")}) Tj`);
    add("/F1 9.5 Tf 0.1 0.1 0.1 rg");
    add(`160 0 Td (${ev.activity.replace(/[()]/g, "")}) Tj`);
    add("ET");

    y -= 14;
    add("BT");
    add("/F2 8.5 Tf 0.35 0.35 0.35 rg");
    add(`160 ${y} Td (${ev.description.replace(/[()]/g, "")}) Tj`);
    add("ET");

    y -= 18;
  }

  y -= 8;
  // Day 02 Section
  add("BT");
  add("/F1 12.5 Tf 0.05 0.15 0.25 rg");
  add(`50 ${y} Td (DAY 02 · 13 DECEMBER 2026 - EVALUATION & VALEDICTORY) Tj`);
  add("ET");
  y -= 20;

  const day2Events = OFFICIAL_SCHEDULE[1]?.events || [];
  for (const ev of day2Events) {
    add("BT");
    add("/F1 9.5 Tf 0.0 0.55 0.75 rg");
    add(`50 ${y} Td (${ev.timeRange.replace(/[()]/g, "")}) Tj`);
    add("/F1 9.5 Tf 0.1 0.1 0.1 rg");
    add(`160 0 Td (${ev.activity.replace(/[()]/g, "")}) Tj`);
    add("ET");

    y -= 14;
    add("BT");
    add("/F2 8.5 Tf 0.35 0.35 0.35 rg");
    add(`160 ${y} Td (${ev.description.replace(/[()]/g, "")}) Tj`);
    add("ET");

    y -= 18;
  }

  y -= 6;
  // Divider line
  add("0.75 0.75 0.75 RG 0.8 w");
  add(`50 ${y} m 545 ${y} l S`);
  y -= 18;

  // Important Rules & Coordination Hotline
  add("BT");
  add("/F1 9 Tf 0.1 0.1 0.1 rg");
  add(`50 ${y} Td (CRITICAL EVENT RULES & COORDINATION HOTLINE) Tj`);
  add("/F2 8.2 Tf 0.3 0.3 0.3 rg");
  add("0 -13 Td (• Team Composition: Strictly 2 to 4 members per team. Designated team lead required.) Tj");
  add("0 -11 Td (• Intellectual Property: 100% participant ownership - all code authored remains teams property.) Tj");
  add("0 -11 Td (• Checkpoints: Both Checkpoint 1 and Checkpoint 2 evaluations are mandatory for final pitch.) Tj");
  add("0 -11 Td (• Coordination Hotline: Aditya R H [Event Coordinator] - Contact: +91 70229 51232) Tj");
  add("0 -11 Td (• Campus Venue: Jain College of Engineering and Technology, Sai Nagar, Unkal, Hubballi - 580031) Tj");
  add("ET");

  const streamContent = content.join("\n");
  const encoder = new TextEncoder();
  const streamBytes = encoder.encode(streamContent);
  const streamLen = streamBytes.length;

  const headerLines = [
    "%PDF-1.4",
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj",
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `6 0 obj << /Length ${streamLen} >> stream\n${streamContent}\nendstream\nendobj`,
  ];

  let cur = 0;
  const xref = ["xref", "0 7", "0000000000 65535 f "];
  for (let i = 0; i < headerLines.length; i++) {
    if (i > 0) {
      xref.push(String(cur).padStart(10, "0") + " 00000 n ");
    }
    cur += encoder.encode(headerLines[i] + "\n").length;
  }

  const xrefOffset = cur;
  const trailer = [
    "trailer << /Size 7 /Root 1 0 R >>",
    "startxref",
    String(xrefOffset),
    "%%EOF",
  ];

  const fullPdfString = headerLines.join("\n") + "\n" + xref.join("\n") + "\n" + trailer.join("\n");
  const pdfBlob = new Blob([fullPdfString], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(pdfBlob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "HackIgnite-1.0-Official-Schedule.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

