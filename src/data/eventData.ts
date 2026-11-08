export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const EVENT_DETAILS = {
  name: "HACKIGNITE 1.0",
  edition: "1.0",
  category: "National Level Hackathon",
  duration: "24 Hours of coding",
  durationShort: "24 Hours",
  tagline: "THINK • BUILD • INNOVATE • IMPACT",
  description: "A 24-Hour Innovation Challenge to Solve Real-World Problems through Technology.",
  dates: "12–13 December 2026",
  datesShort: "12–13 DEC 2026",
  venue: "JCET, Hubballi",
  venueFull: "Jain College of Engineering and Technology, Hubballi",
  shortVenue: "JCET, HUBBALLI",
  institution: "Jain College of Engineering and Technology, Hubballi",
  address: "404/4/5, Hebballi Road, Sai Nagar, Unkal, Hubballi – 580031",
  department: "Department of Computer Science and Engineering (CSE/AI&ML)",
  registrationFee: "₹2,000 per team",
  registrationFeeAmount: "₹2,000",
  feeNote: "Team entry fee (₹2,000 per team)",
  competitionHighlight: "5 Places to Conquer",
  prizePool: "Up to ₹40,000",
  totalPrizePool: "Up to ₹40,000",
  prizePoolScope: "Entire hackathon (Shared across Web Development and App Development tracks)",
  prizePoolAllocation: "Shared across both tracks",
  unstopUrl: "https://unstop.com/o/ozT1RUD?utm_medium=Share&utm_source=adityhan33581&utm_campaign=Online_coding_challenge",
  unstopQr: "/assets/unstop-qr.jpg",
  coordinator: "Aditya R H",
  contactPhone: "7022951232",
  contactPhoneFormatted: "+91 70229 51232",
  // 12 December 2026 at 9:30 AM IST (Asia/Kolkata)
  countdownTarget: "2026-12-12T09:30:00+05:30",
  coordinates: {
    lat: 15.3934,
    lng: 75.1232,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Jain+College+of+Engineering+and+Technology+Hubballi",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Jain+College+of+Engineering+and+Technology+Hubballi",
    embedUrl: "https://maps.google.com/maps?q=Jain%20College%20of%20Engineering%20and%20Technology%20Hubballi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
};

export interface TimelineItem {
  step: string;
  phase: string;
  date: string;
  time: string;
  title: string;
  description: string;
  isMilestone?: boolean;
}

export const TIMELINE: TimelineItem[] = [
  {
    step: "01",
    phase: "Phase 1: Screening",
    date: "12 DEC 2026",
    time: "09:30 AM",
    title: "Registration & Welcome",
    description: "Check-in, identity verification, and workstation allocation.",
    isMilestone: true,
  },
  {
    step: "02",
    phase: "Phase 2: Launch",
    date: "12 DEC 2026",
    time: "11:30 AM",
    title: "Coding Kickoff",
    description: "The 24-hour national hackathon clock begins.",
    isMilestone: true,
  },
  {
    step: "03",
    phase: "Phase 3: Orbit Sprint",
    date: "12 DEC 2026",
    time: "06:00 PM",
    title: "Checkpoint 1 — Architecture Review",
    description: "Jury inspection of system architecture and progress.",
  },
  {
    step: "04",
    phase: "Phase 4: Final Evaluation",
    date: "13 DEC 2026",
    time: "05:30 AM",
    title: "Checkpoint 2 — Functionality Check",
    description: "Pre-dawn evaluation of core features and API integrations.",
  },
  {
    step: "05",
    phase: "Phase 5: Victory",
    date: "13 DEC 2026",
    time: "11:30 AM",
    title: "Code Freeze & Pitching",
    description: "Hard freeze, final prototype demonstrations, and awards.",
    isMilestone: true,
  },
];

// Single Source of Truth for HackIgnite 1.0 Prize Pool
export const PRIZE_DETAILS = {
  event: "HACKIGNITE 1.0",
  totalPrizePool: "Up to ₹40,000",
  amountNumber: 40000,
  scope: "Entire hackathon",
  competitionTracks: ["Web Development", "App Development"],
  allocation: "Shared across both tracks",
  placesToConquer: "5 Places to Conquer",
  heading: "ONE HACKATHON. ONE SHARED PRIZE POOL.",
  mainAmount: "UP TO ₹40,000",
  supportingText:
    "A common prize pool for HackIgnite 1.0, shared across both Web Development and App Development tracks.",
};

// Official Unstop Registration Hub Configuration
export const UNSTOP_REGISTRATION = {
  url: "https://unstop.com/o/ozT1RUD?utm_medium=Share&utm_source=adityhan33581&utm_campaign=Online_coding_challenge",
  qrImage: "/assets/unstop-qr.jpg",
  platform: "Unstop",
  badge: "OFFICIAL PARTNER // UNSTOP POWERED",
  headline: "CLAIM YOUR SEAT BEFORE SLOTS CLOSE",
  subheadline:
    "Official 24-Hour Innovation Challenge at JCET Hubballi. Limited physical slots remaining for national teams.",
  fee: "₹2,000 per team",
  prizePool: "Up to ₹40,000",
  deadlineNote: "Registration closes once venue hacker capacity is reached",
};

export const PILLARS = [
  {
    num: "01",
    title: "THINK",
    desc: "Explore challenges and develop meaningful ideas.",
  },
  {
    num: "02",
    title: "BUILD",
    desc: "Turn ideas into working solutions.",
  },
  {
    num: "03",
    title: "INNOVATE",
    desc: "Approach real-world problems creatively.",
  },
  {
    num: "04",
    title: "IMPACT",
    desc: "Build technology with practical purpose.",
  },
];

export interface ScheduleItem {
  id: string;
  timeRange: string;
  activity: string;
  description: string;
  type: "registration" | "coding" | "food" | "checkpoint" | "ceremony";
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  note?: string;
}

export interface DaySchedule {
  dayNumber: number;
  dayLabel: string;
  dateStr: string;
  dateIso: string;
  events: ScheduleItem[];
}

export const OFFICIAL_SCHEDULE: DaySchedule[] = [
  {
    dayNumber: 1,
    dayLabel: "DAY 01",
    dateStr: "12 DECEMBER 2026",
    dateIso: "2026-12-12",
    events: [
      {
        id: "d1-1",
        timeRange: "09:30 AM – 10:30 AM",
        activity: "Registration",
        description: "Participant check-in, identity verification, welcome kit distribution, and hack station allotment.",
        type: "registration",
        startHour: 9,
        startMinute: 30,
        endHour: 10,
        endMinute: 30,
      },
      {
        id: "d1-2",
        timeRange: "11:30 AM",
        activity: "Coding Begins",
        description: "Official kickoff! The 24-hour innovation clock starts. Teams initiate architecture and sprint development.",
        type: "coding",
        startHour: 11,
        startMinute: 30,
        endHour: 13,
        endMinute: 0,
      },
      {
        id: "d1-3",
        timeRange: "01:00 PM – 02:30 PM",
        activity: "Lunch",
        description: "Catered lunch break on campus. Fuel up and sync with teammates.",
        type: "food",
        startHour: 13,
        startMinute: 0,
        endHour: 14,
        endMinute: 30,
      },
      {
        id: "d1-4",
        timeRange: "06:00 PM – 07:30 PM",
        activity: "Checkpoint 1",
        description: "Initial milestone review. Mentors review problem framing, data schema, and technical approach.",
        type: "checkpoint",
        startHour: 18,
        startMinute: 0,
        endHour: 19,
        endMinute: 30,
      },
      {
        id: "d1-5",
        timeRange: "08:00 PM – 09:30 PM",
        activity: "Dinner",
        description: "Evening dinner on campus. Re-energize for the night-long development phase.",
        type: "food",
        startHour: 20,
        startMinute: 0,
        endHour: 21,
        endMinute: 30,
      },
    ],
  },
  {
    dayNumber: 2,
    dayLabel: "DAY 02",
    dateStr: "13 DECEMBER 2026",
    dateIso: "2026-12-13",
    events: [
      {
        id: "d2-1",
        timeRange: "01:00 AM – 01:30 AM",
        activity: "Refreshment Break",
        description: "Midnight coffee and quick refreshments to keep momentum high.",
        type: "food",
        startHour: 1,
        startMinute: 0,
        endHour: 1,
        endMinute: 30,
        note: "Early-morning refreshment break (Pending organizer re-verification)",
      },
      {
        id: "d2-2",
        timeRange: "05:30 AM – 07:00 AM",
        activity: "Checkpoint 2",
        description: "Dawn milestone evaluation. Mentors review working prototype integration and feature completion.",
        type: "checkpoint",
        startHour: 5,
        startMinute: 30,
        endHour: 7,
        endMinute: 0,
      },
      {
        id: "d2-3",
        timeRange: "07:30 AM – 08:30 AM",
        activity: "Breakfast",
        description: "Morning breakfast served on campus. Final push before code freeze.",
        type: "food",
        startHour: 7,
        startMinute: 30,
        endHour: 8,
        endMinute: 30,
      },
      {
        id: "d2-4",
        timeRange: "11:30 AM",
        activity: "Coding Ends",
        description: "24-hour coding window concludes! Hard code freeze; repository commits and demo links locked.",
        type: "coding",
        startHour: 11,
        startMinute: 30,
        endHour: 11,
        endMinute: 30,
      },
      {
        id: "d2-5",
        timeRange: "Until 01:00 PM",
        activity: "Prize Distribution and Event Closure",
        description: "Final team demonstrations, jury evaluation, award ceremony, and valedictory closure.",
        type: "ceremony",
        startHour: 11,
        startMinute: 30,
        endHour: 13,
        endMinute: 0,
      },
    ],
  },
];

export const OFFICIAL_RULES = [
  {
    id: "rule-1",
    title: "Team Composition",
    summary: "Strictly 2 to 4 members per participating team.",
    detail: "Every team must register with a designated team lead. Inter-college and inter-branch teams are welcomed.",
    badge: "TEAM SPECS",
  },
  {
    id: "rule-2",
    title: "24-Hour Sprint Window",
    summary: "All project code and assets must be developed during the hackathon.",
    detail: "Pre-existing complete projects or templates are strictly prohibited. Open-source libraries and APIs may be leveraged provided they are disclosed.",
    badge: "CODE INTEGRITY",
  },
  {
    id: "rule-3",
    title: "100% Intellectual Property",
    summary: "Participants retain full ownership of all code and intellectual property.",
    detail: "All solutions, repositories, designs, and demonstrations created during HackIgnite 1.0 remain the exclusive property of participating teams.",
    badge: "IP OWNERSHIP",
  },
  {
    id: "rule-4",
    title: "On-Campus Venue Conduct",
    summary: "Participants must adhere to the JCET Hubballi campus code of conduct.",
    detail: "Teams must carry their valid college identity cards and development hardware. High-speed network, power hubs, and meals are provided on campus.",
    badge: "CAMPUS CODE",
  },
  {
    id: "rule-5",
    title: "Evaluation & Demo",
    summary: "Demonstrations evaluated on technical engineering, viability, and impact.",
    detail: "Both checkpoints are mandatory for final pitch eligibility. Teams must demonstrate live functionality to the jury panel.",
    badge: "JUDGING",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is HackIgnite 1.0?",
    answer:
      "HackIgnite 1.0 is a national-level, 24-hour hackathon presented by the Department of Computer Science and Engineering (CSE/AI&ML) at Jain College of Engineering and Technology, Hubballi. It challenges participants to think, build, innovate, and create impactful technological solutions for real-world problems.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "When is the hackathon?",
    answer:
      "HackIgnite 1.0 is scheduled to take place on 12–13 December 2026. Registration check-in begins at 09:30 AM IST on 12 December 2026.",
    category: "Schedule",
  },
  {
    id: "faq-3",
    question: "Where will the event take place?",
    answer:
      "The event will be hosted on-campus at Jain College of Engineering and Technology (JCET), Hubballi. The address is 404/4/5, Hebballi Road, Sai Nagar, Unkal, Hubballi – 580031.",
    category: "Venue",
  },
  {
    id: "faq-4",
    question: "How long is the hackathon?",
    answer:
      "HackIgnite 1.0 features 24 hours of continuous coding, commencing at 11:30 AM on 12 December and concluding at 11:30 AM on 13 December, followed by prize distribution until 01:00 PM.",
    category: "Format",
  },
  {
    id: "faq-5",
    question: "What is the entry fee?",
    answer:
      "The entry fee is ₹2,000 per team.",
    category: "Registration",
  },
  {
    id: "faq-6",
    question: "What is the permitted team size?",
    answer:
      "Each team must consist of 2 to 4 members.",
    category: "Registration",
  },
  {
    id: "faq-7",
    question: "Who is organizing the event?",
    answer:
      "The event is organized by the Department of Computer Science and Engineering (CSE/AI&ML) at Jain College of Engineering and Technology, Hubballi.",
    category: "Organizers",
  },
  {
    id: "faq-8",
    question: "Whom can participants contact for queries?",
    answer:
      "For any queries regarding HackIgnite 1.0, participants can contact Event Coordinator Aditya R H directly at 7022951232.",
    category: "Contact",
  },
  {
    id: "faq-9",
    question: "Is the ₹40,000 prize pool available separately for both tracks?",
    answer:
      "No. HackIgnite 1.0 has one shared prize pool of up to ₹40,000 across the Web Development and App Development tracks. ₹40,000 is not allocated separately to each track.",
    category: "Prizes",
  },
];

export interface TrackItem {
  id: string;
  name: string;
  category: string;
  code: string;
  status: string;
  description: string;
  technologies: string[];
  prize: string;
  image: string;
}

// Official competition tracks
export const TRACKS: TrackItem[] = [
  {
    id: "web-development",
    name: "Web Development",
    category: "Official Track",
    code: "TRK-01",
    status: "Confirmed",
    description:
      "Architect responsive, high-performance web applications and decentralized digital experiences. Focus on modern frontend frameworks, scalable cloud architectures, interactive UI/UX, and robust backend APIs.",
    technologies: ["React / Next.js", "Full-Stack APIs", "Tailwind CSS", "Node / Cloud", "Real-Time Systems"],
    prize: "5 Places to Conquer",
    image: "/assets/cards/track-web-dev.webp",
  },
  {
    id: "app-development",
    name: "App Development",
    category: "Official Track",
    code: "TRK-02",
    status: "Confirmed",
    description:
      "Engineer intuitive, high-performance mobile applications across iOS, Android, or cross-platform ecosystems. Focus on sleek mobile user interfaces, offline-first local storage, device sensor integrations, and seamless cloud synchronization.",
    technologies: ["React Native / Flutter", "Swift / Kotlin", "Mobile UX/UI", "Offline-First Sync", "Push & Device APIs"],
    prize: "5 Places to Conquer",
    image: "/assets/cards/track-app-dev.webp",
  },
];
