import { EVENT_DETAILS, OFFICIAL_RULES } from "../data/eventData";

function escapePdfText(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function generateRulesPdf(): void {
  const content: string[] = [];
  const add = (str: string) => content.push(str);

  // Document Header Kicker & Title
  add("BT");
  add("/F1 17 Tf 0.0 0.78 0.91 rg"); // Electric Cyan (#00C8E8)
  add(`50 790 Td (${escapePdfText("HACKIGNITE 1.0 - OFFICIAL RULES & GUIDELINES")}) Tj`);
  add("ET");

  add("BT");
  add("/F1 10.5 Tf 0.1 0.1 0.1 rg");
  add(`50 770 Td (${escapePdfText(EVENT_DETAILS.department)}) Tj`);
  add("/F2 9 Tf 0.35 0.35 0.35 rg");
  add(`0 -14 Td (${escapePdfText(EVENT_DETAILS.institution)}) Tj`);
  add(`0 -13 Td (${escapePdfText("Official Dates: 12-13 December 2026  |  National Level 24-Hour Hackathon")}) Tj`);
  add("ET");

  // Cyan divider line
  add("0.0 0.78 0.91 RG 1.5 w");
  add("50 726 m 545 726 l S");

  // Rules Sections
  const rules = [
    {
      num: "1",
      badge: "TEAM SPECS",
      title: "TEAM COMPOSITION & ELIGIBILITY",
      items: [
        "Strictly 2 to 4 members per participating team.",
        "Every team must register with a designated Team Lead for all official communications.",
        "Inter-college, inter-branch, and cross-disciplinary collaborations are welcomed.",
      ],
    },
    {
      num: "2",
      badge: "CODE INTEGRITY",
      title: "24-HOUR SPRINT & CODE INTEGRITY",
      items: [
        "The coding window begins at 11:30 AM on 12 December 2026 and ends at 11:30 AM on 13 December 2026.",
        "All project code, architectures, and assets must be developed during the 24-hour sprint.",
        "Pre-built proprietary products or existing complete projects are strictly prohibited.",
        "Public open-source libraries, frameworks, and APIs are permitted provided their usage is disclosed.",
      ],
    },
    {
      num: "3",
      badge: "IP OWNERSHIP",
      title: "INTELLECTUAL PROPERTY (100% PARTICIPANT OWNERSHIP)",
      items: [
        "All code, software, repositories, prototypes, and presentations remain the exclusive IP of the team.",
        "The host institution and organizers claim zero ownership or licensing rights over participant inventions.",
      ],
    },
    {
      num: "4",
      badge: "EVALUATION",
      title: "MANDATORY CHECKPOINTS & JURY EVALUATION",
      items: [
        "Checkpoint 1 (12 Dec, 06:00 PM - 07:30 PM): Problem framing, architectural scope, and feasibility.",
        "Checkpoint 2 (13 Dec, 05:30 AM - 07:00 AM): Working prototype verification and sprint feature progress.",
        "Both checkpoints are mandatory for teams to qualify for the final pitching round.",
      ],
    },
    {
      num: "5",
      badge: "CAMPUS CODE",
      title: "ON-CAMPUS VENUE & CODE OF CONDUCT",
      items: [
        "Participants must carry their valid college identity card and development hardware at all times.",
        "Respectful, professional, and ethical conduct is strictly required. Harassment leads to immediate disqualification.",
        "High-speed Wi-Fi, dedicated power hubs, and meals (Lunch, Dinner, Midnight Snack, Breakfast) are provided.",
      ],
    },
  ];

  let y = 705;

  for (const rule of rules) {
    // Section Header
    add("BT");
    add("/F1 10.5 Tf 0.0 0.55 0.75 rg");
    add(`50 ${y} Td (${escapePdfText(`SECTION ${rule.num}: ${rule.title}`)}) Tj`);
    add("ET");

    y -= 14;

    for (const item of rule.items) {
      add("BT");
      add("/F2 8.5 Tf 0.25 0.25 0.25 rg");
      add(`60 ${y} Td (${escapePdfText(`•  ${item}`)}) Tj`);
      add("ET");
      y -= 12.5;
    }

    y -= 6;
  }

  // Divider line
  add("0.75 0.75 0.75 RG 0.8 w");
  add(`50 ${y} m 545 ${y} l S`);
  y -= 16;

  // Official Helpline & Venue Block
  add("BT");
  add("/F1 9.5 Tf 0.05 0.15 0.25 rg");
  add(`50 ${y} Td (${escapePdfText("OFFICIAL EVENT COORDINATION & VENUE HELPLINE")}) Tj`);
  add("/F2 8.5 Tf 0.3 0.3 0.3 rg");
  add("0 -13 Td (• Lead Coordinator: Aditya R H  |  Phone: +91 70229 51232) Tj");
  add("0 -11.5 Td (• Event Coordinators: Alvin Benedict (+91 73491 90317)  |  Pallavi (+91 78921 27598)) Tj");
  add(`0 -11.5 Td (${escapePdfText(`• Campus Address: ${EVENT_DETAILS.address}`)}) Tj`);
  add("0 -11.5 Td (• Official Registration Portal: Unstop  |  Registration Fee: Rs. 2,000 per team) Tj");
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
  a.download = "HackIgnite-1.0-Official-Rules.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

