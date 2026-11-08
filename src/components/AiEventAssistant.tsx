import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Radio,
  ExternalLink,
  ChevronDown,
  Minimize2,
} from "lucide-react";
import { EVENT_DETAILS, OFFICIAL_SCHEDULE, OFFICIAL_RULES, UNSTOP_REGISTRATION } from "../data/eventData";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "When is HackIgnite 1.0?",
  "Where is the venue?",
  "What is the entry fee?",
  "What is the event schedule?",
  "When does coding start?",
  "When does coding end?",
  "What are the event rules?",
  "Where can I find the campus map?",
  "How can I contact the coordinator?",
];

// Grounded Knowledge Base response resolver
function getGroundedAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Date & Timing
  if (q.includes("when") || q.includes("date") || q.includes("timing") || q.includes("commence")) {
    return `HackIgnite 1.0 is scheduled for 12–13 December 2026. Participant check-in & registration begins on 12 December at 09:30 AM IST, followed by coding kickoff at 11:30 AM IST.`;
  }

  // 2. Venue & Campus Map
  if (q.includes("where") || q.includes("venue") || q.includes("location") || q.includes("campus") || q.includes("map") || q.includes("address")) {
    return `The event takes place on-campus at ${EVENT_DETAILS.institution}.\nAddress: ${EVENT_DETAILS.address}.\n\nYou can explore the interactive satellite map in the 'Campus Coordinates' section or navigate directly via Google Maps!`;
  }

  // 3. Entry Fee & Prize Pool
  if (q.includes("fee") || q.includes("entry") || q.includes("cost") || q.includes("registration fee")) {
    return `The official entry fee is ₹2,000 per team. This is the complete team registration fee for HackIgnite 1.0.`;
  }

  // 3a. Registration & Unstop Portal
  if (q.includes("register") || q.includes("registration") || q.includes("apply") || q.includes("signup") || q.includes("sign up") || q.includes("unstop") || q.includes("qr")) {
    return `You can register your team directly through the official Unstop portal at ${UNSTOP_REGISTRATION.url} or by clicking 'REGISTER NOW' anywhere on the website to scan the mobile QR code! Entry fee is ₹2,000 per team (up to 4 members).`;
  }

  // 3b. Prize Pool - Track Separation Query (Shared Pool Clarification)
  if (
    (q.includes("separate") || q.includes("each track") || q.includes("both tracks") || q.includes("per track") || q.includes("individually") || q.includes("individual")) &&
    (q.includes("prize") || q.includes("pool") || q.includes("40,000") || q.includes("40000") || q.includes("bounty") || q.includes("award") || q.includes("money"))
  ) {
    return `No. HackIgnite 1.0 has one shared prize pool of up to ₹40,000 across the Web Development and App Development tracks. ₹40,000 is not allocated separately to each track.`;
  }

  // 3c. General Prize Pool & Awards
  if (q.includes("prize") || q.includes("award") || q.includes("pool") || q.includes("cash") || q.includes("conquer") || q.includes("bounty") || q.includes("reward") || q.includes("winner") || q.includes("money")) {
    return `HackIgnite 1.0 features one shared prize pool of up to ₹40,000 across both the Web Development and App Development tracks! Teams compete for cash honors and trophies across the 5 Places to Conquer podium categories: Winner (#01 Champion), Runner Up (#02 Excellence in Engineering), Second Runner Up (#03 Outstanding Innovation), Best Development (#04 Architecture & Code Rigor), and Best Project (#05 Complete Viability & Impact). The ₹40,000 pool is common to the entire event, not allocated separately per track.`;
  }

  // 4. Coding Start
  if (q.includes("coding start") || q.includes("start coding") || q.includes("kickoff") || q.includes("begin")) {
    return `Coding officially starts at 11:30 AM IST on 12 December 2026, marking the start of the 24-hour innovation challenge.`;
  }

  // 5. Coding End / Freeze
  if (q.includes("coding end") || q.includes("code freeze") || q.includes("finish") || q.includes("deadline")) {
    return `The 24-hour coding window concludes at 11:30 AM IST on 13 December 2026, followed by final project demonstrations and prize distribution until 01:00 PM IST.`;
  }

  // 6. Schedule / Timetable
  if (q.includes("schedule") || q.includes("timetable") || q.includes("agenda") || q.includes("timeline") || q.includes("lunch") || q.includes("dinner") || q.includes("breakfast")) {
    return `Here is the official timetable (Asia/Kolkata):\n\nDAY 01 (12 Dec 2026):\n• 09:30 AM – 10:30 AM: Registration\n• 11:30 AM: Coding Begins\n• 01:00 PM – 02:30 PM: Lunch\n• 06:00 PM – 07:30 PM: Checkpoint 1\n• 08:00 PM – 09:30 PM: Dinner\n\nDAY 02 (13 Dec 2026):\n• 01:00 AM – 01:30 AM: Refreshment Break\n• 05:30 AM – 07:00 AM: Checkpoint 2\n• 07:30 AM – 08:30 AM: Breakfast\n• 11:30 AM: Coding Ends\n• Until 01:00 PM: Prize Distribution & Event Closure.`;
  }

  // 7. Team Size & Rules
  if (q.includes("rule") || q.includes("team") || q.includes("size") || q.includes("members") || q.includes("conduct") || q.includes("guideline")) {
    return `Key Official Rules for HackIgnite 1.0:\n• Team size: Strictly 2 to 4 members.\n• 24-Hour Sprint: All code must be authored during the hackathon.\n• IP Ownership: Participants retain 100% ownership of all intellectual property and solutions.\n• Checkpoints: Both Checkpoint 1 & 2 are mandatory for final pitch qualification.`;
  }

  // 8. Coordinator / Contact
  if (q.includes("contact") || q.includes("coordinator") || q.includes("phone") || q.includes("aditya") || q.includes("call") || q.includes("hotline")) {
    return `You can reach the official Event Coordinator Aditya R H directly at 7022951232 (+91 70229 51232) for any student registration queries or logistical questions.`;
  }

  // 9. Tracks
  if (q.includes("track") || q.includes("challenge") || q.includes("problem statement") || q.includes("domain") || q.includes("web") || q.includes("app")) {
    return `HackIgnite 1.0 features two official competition tracks: 1) Web Development (modern frontend architectures, scalable cloud APIs, and full-stack web platforms) and 2) App Development (iOS, Android, and cross-platform mobile ecosystems). Both tracks share the common event prize pool of up to ₹40,000 and compete together for the 5 Places to Conquer awards!`;
  }

  // 10. Organizers / College
  if (q.includes("organizer") || q.includes("institution") || q.includes("college") || q.includes("department")) {
    return `HackIgnite 1.0 is organized by the Department of Computer Science and Engineering (CSE/AI&ML) at Jain College of Engineering and Technology (JCET), Hubballi.`;
  }

  // Strict Fallback for Unconfirmed Information
  return `That information has not been officially confirmed yet. Please contact the event coordinator at 7022951232.`;
}

export default function AiEventAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "bot",
      text: "Hey! I'm your HackIgnite event assistant. Ask me anything about the event schedule, campus venue, registration, rules, or coordinator contact.",
      timestamp: "NOW",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Realistic typing delay (450ms)
    setTimeout(() => {
      const answer = getGroundedAnswer(query);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#07131C]/95 border border-[#00C8E8]/50 hover:border-[#00C8E8] text-white shadow-[0_0_25px_rgba(0,200,232,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open Ignite Assistant"
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C8E8] absolute -top-1 -right-1 animate-ping" />
              <div className="w-8 h-8 rounded-full bg-[#00C8E8]/20 flex items-center justify-center text-[#8DEBFF]">
                <Bot className="w-5 h-5 text-[#00C8E8]" />
              </div>
            </div>
            <div className="text-left hidden sm:block pr-1">
              <div className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1.5">
                <span>IGNITE ASSISTANT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8]" />
              </div>
              <div className="text-[10px] text-[#8DEBFF]/80 font-mono">Ask about HackIgnite 1.0</div>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Mobile Bottom Sheet */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] max-w-full h-[540px] sm:h-[580px] max-h-[88vh] z-50 flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#07131C]/95 border border-[#00C8E8]/40 shadow-[0_0_50px_rgba(0,200,232,0.25)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#050708]/90 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00C8E8]/15 border border-[#00C8E8]/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#00C8E8]" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-2">
                  <span>IGNITE ASSISTANT</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px]">LIVE</span>
                </div>
                <div className="text-[10.5px] text-[#A4B6BF] font-mono">Official Event Copilot</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A4B6BF] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-md bg-[#00C8E8]/20 border border-[#00C8E8]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00C8E8]" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${isBot
                        ? "bg-[#050708]/90 border border-white/10 text-[#F3F8FA] rounded-tl-sm font-['Inter',sans-serif]"
                        : "bg-[#00C8E8] text-[#050708] rounded-tr-sm font-medium font-['Inter',sans-serif] shadow-sm"
                      }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    <div
                      className={`text-[9px] mt-1.5 font-mono ${isBot ? "text-[#A4B6BF]/60 text-right" : "text-[#050708]/60 text-right"
                        }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#8DEBFF] font-mono pl-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-[#A4B6BF] ml-1">Analyzing event knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-4 py-2 bg-[#050708]/50 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SUGGESTED_QUESTIONS.slice(0, 5).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-[#07131C] hover:bg-[#00C8E8]/20 border border-white/10 hover:border-[#00C8E8]/40 text-[10.5px] font-mono text-[#8DEBFF] whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#050708]/95 border-t border-white/10 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about schedule, venue, rules..."
              className="flex-1 bg-[#07131C] border border-white/15 focus:border-[#00C8E8] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-[#A4B6BF]/50 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-[#00C8E8] hover:bg-[#8DEBFF] disabled:opacity-40 disabled:pointer-events-none text-[#050708] flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,200,232,0.4)] cursor-pointer shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
