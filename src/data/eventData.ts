export interface Track {
  id: string;
  name: string;
  code: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  status: string;
  technologies: string[];
  prize: string;
}

export interface TimelineEvent {
  step: string;
  time: string;
  date: string;
  title: string;
  phase: string;
  description: string;
  isMilestone?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const EVENT_DETAILS = {
  name: "HACKIGNITE 1.0",
  edition: "1.0",
  tagline: "BEYOND INNOVATION.",
  subtitle: "A National Level 24-Hour Hackathon",
  dates: "November 15–16, 2026",
  mode: "Hybrid (On-Campus Arena & Global Metaverse Stream)",
  venue: "Center for Innovation & Technology Arena, Main Campus",
  registrationFee: "₹0 Free Entry (Selected Teams)",
  teamSize: "2 – 4 Builders",
  prizePool: "₹2,50,000+",
  participantsExpected: "500+ Innovators",
  registrationDeadline: "November 10, 2026",
  countdownTarget: "2026-11-15T09:00:00",
  contactEmail: "hackignite@campus.edu",
  contactPhone: "+91 (800) 422-5446",
};

export const TRACKS: Track[] = [
  {
    id: "ai-intelligence",
    name: "Artificial Intelligence & Agents",
    code: "TRACK-01",
    category: "AI & ML",
    tagline: "Autonomous systems, LLMs & Cognitive Computing",
    description: "Engineer the next leap in autonomous agents, multi-modal reasoning models, real-time edge intelligence, and humane AI systems.",
    image: "/src/assets/images/track_ai_astronaut_1794046418232.jpg",
    status: "Neural Matrix",
    technologies: ["Gemini API", "PyTorch", "LangChain", "Vector DBs", "Edge AI"],
    prize: "₹75,000 + Cloud Grants",
  },
  {
    id: "web3-systems",
    name: "Web3 & Distributed Systems",
    code: "TRACK-02",
    category: "Web3",
    tagline: "Decentralized protocols, Zero-Knowledge & High-Throughput",
    description: "Architect tamper-proof protocols, zero-knowledge verifications, decentralized identity, and next-generation decentralized infrastructure.",
    image: "/src/assets/images/track_web3_astronaut_1794046418410.jpg",
    status: "Digital Speed",
    technologies: ["Solidity", "Rust", "Zero Knowledge", "IPFS", "Smart Contracts"],
    prize: "₹75,000 + Grant Bounty",
  },
  {
    id: "cyber-defense",
    name: "Cybersecurity & Critical Defense",
    code: "TRACK-03",
    category: "Cybersecurity",
    tagline: "Automated threat hunting, Cloud resilience & Cryptography",
    description: "Fortify planetary digital infrastructure through predictive threat discovery, quantum-resistant encryption, and automated exploit containment.",
    image: "/src/assets/images/track_cyber_astronaut_1794046419586.jpg",
    status: "Radiant Shield",
    technologies: ["eBPF", "Post-Quantum", "SIEM Automations", "Sandboxing", "Rust"],
    prize: "₹50,000 + Security Hardware",
  },
  {
    id: "open-innovation",
    name: "Open Cosmic Innovation",
    code: "TRACK-04",
    category: "Open Track",
    tagline: "HealthTech, Climate Solutions, FinTech & Space Exploration",
    description: "Tackle ambitious multidisciplinary bottlenecks across clean energy, planetary observation, assistive robotics, and digital governance.",
    image: "/src/assets/images/hero_astronaut_floating_1794046417639.jpg",
    status: "Limitless Horizon",
    technologies: ["IoT Sensors", "Next.js", "Robotics", "CleanTech", "APIs"],
    prize: "₹50,000 + Incubation Support",
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    step: "01",
    date: "OCT 15 – NOV 10",
    time: "23:59 IST",
    title: "Registration & Idea Submission",
    phase: "Phase 1: Screening",
    description: "Submit your team roster and problem statement synopsis. Online preliminary screening and shortlisted teams announced on rolling basis.",
  },
  {
    step: "02",
    date: "NOV 15",
    time: "08:30 AM",
    title: "Check-in & Kit Distribution",
    phase: "Phase 2: Arrival",
    description: "Registration confirmation, participant badges, cosmic swag packs, and high-speed network credentials assigned.",
  },
  {
    step: "03",
    date: "NOV 15",
    time: "09:30 AM",
    title: "Opening Ceremony & Problem Reveal",
    phase: "Phase 2: Launch",
    description: "Keynote address, sponsor problem statements unveiled, rules briefing, and official countdown initialization.",
    isMilestone: true,
  },
  {
    step: "04",
    date: "NOV 15",
    time: "10:00 AM",
    title: "Hacking Sprint Commences",
    phase: "Phase 3: Orbit Sprint",
    description: "24-hour non-stop countdown begins. High-energy coding, wireframing, and repository initialization.",
    isMilestone: true,
  },
  {
    step: "05",
    date: "NOV 15",
    time: "05:00 PM",
    title: "Checkpoint 1: Mentorship Review",
    phase: "Phase 3: Validation",
    description: "Industry mentors and domain experts visit team pods for 1:1 architectural feedback, API guidance, and pivot advice.",
  },
  {
    step: "06",
    date: "NOV 16",
    time: "01:00 AM",
    title: "Midnight Cosmic Jam & Checkpoint 2",
    phase: "Phase 3: Deep Space",
    description: "Midnight coffee rush, mini gaming trivia challenges, energy snacks, and code repository progress audits.",
  },
  {
    step: "07",
    date: "NOV 16",
    time: "10:00 AM",
    title: "Code Freeze & Pitch Submissions",
    phase: "Phase 4: Final Evaluation",
    description: "Hard stop on commits. Project submission on Devfolio portal with demo video, live deployment link, and documentation.",
    isMilestone: true,
  },
  {
    step: "08",
    date: "NOV 16",
    time: "11:30 AM",
    title: "Jury Pitching & Demo Arena",
    phase: "Phase 4: Scrutiny",
    description: "Top 15 shortlisted teams present 4-minute live pitches followed by 3-minute jury Q&A in the main amphitheater.",
  },
  {
    step: "09",
    date: "NOV 16",
    time: "02:30 PM",
    title: "Grand Award Ceremony",
    phase: "Phase 5: Victory",
    description: "Announcement of track champions, overall winner trophies, cash grants, and post-event networking mixer.",
    isMilestone: true,
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who is eligible to participate in HackIgnite 1.0?",
    answer: "HackIgnite 1.0 is open to all enrolled undergraduate, graduate, and diploma students across universities and technical colleges nationwide. Inter-college teams and diverse skill-level squads are fully encouraged.",
    category: "Eligibility",
  },
  {
    id: "faq-2",
    question: "Is there any registration fee to participate?",
    answer: "Zero. Registration is 100% free of cost. Shortlisted participants receive free entry, 24-hour high-speed Wi-Fi, full meals, refreshments, midnight snacks, and exclusive merchandise.",
    category: "Registration",
  },
  {
    id: "faq-3",
    question: "What is the team size requirement?",
    answer: "Teams must consist of 2 to 4 members. You can either form your complete squad prior to registration or find teammates in our dedicated Discord channels.",
    category: "Teams",
  },
  {
    id: "faq-4",
    question: "What are the primary judging criteria?",
    answer: "Projects are evaluated on 4 core pillars: Innovation & Originality (25%), Technical Complexity & Architecture (30%), Real-World Impact & Feasibility (25%), and Design / Pitch Clarity (20%).",
    category: "Judging",
  },
  {
    id: "faq-5",
    question: "Can we build on a pre-existing project or codebase?",
    answer: "No. All code, design assets, and functional logic must be authored during the official 24-hour hackathon window. Using open-source libraries, public APIs, and pre-trained foundation models is permitted.",
    category: "Rules",
  },
  {
    id: "faq-6",
    question: "What hardware and facilities will be provided at the venue?",
    answer: "Each team pod will be equipped with dedicated power strips, uninterrupted high-speed LAN/Wi-Fi, quiet rest zones, 24/7 security, snacks, and technical support mentors.",
    category: "Logistics",
  },
];

export const OVERVIEW_STATS = [
  { label: "Duration", value: "24h", subtext: "Non-stop sprint" },
  { label: "Prize Pool", value: "₹2.5L+", subtext: "Cash & incubation" },
  { label: "Team Size", value: "2 – 4", subtext: "Builders per squad" },
  { label: "Entry Fee", value: "₹0", subtext: "Free for shortlists" },
];

export const ORGANIZERS = {
  institution: "National Institute of Science & Technology",
  department: "Department of Computer Science & Engineering",
  facultyAdvisors: [
    { name: "Dr. A. R. Sharma", role: "Head of Dept & Chief Patron" },
    { name: "Prof. K. Venkatesh", role: "Faculty Convener & IEEE Mentor" },
  ],
  studentCoordinators: [
    { name: "Shreyas M.", role: "Lead Student Organizer" },
    { name: "Ananya Iyer", role: "Head of Technical Ops" },
    { name: "Rohan Deshmukh", role: "Head of Logistics & Sponsorship" },
  ],
};
