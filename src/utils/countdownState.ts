/**
 * Event State Machine and Time Remaining Calculator for HackIgnite 1.0
 * Strict Timezone: Asia/Kolkata (IST = UTC+5:30)
 */

export type EventStatus =
  | "BEFORE_REGISTRATION"
  | "REGISTRATION_OPEN"
  | "CODING_IN_PROGRESS"
  | "CODING_COMPLETED"
  | "FINAL_PRESENTATIONS"
  | "EVENT_COMPLETED";

export interface CountdownStateResult {
  status: EventStatus;
  statusBadge: string;
  statusHeadline: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCountdownActive: boolean;
  targetDescription: string;
}

// Convert any Date into Asia/Kolkata milliseconds timestamp
function getIstTime(date = new Date()): number {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  // IST is UTC + 5.5 hours
  return utc + 3600000 * 5.5;
}

// Precise timestamps in Asia/Kolkata (IST)
// 12 Dec 2026:
// 09:30 AM IST: Registration begins
const T_REGISTRATION_OPEN = new Date("2026-12-12T09:30:00+05:30").getTime();
// 10:30 AM IST: Registration ends
const T_REGISTRATION_CLOSE = new Date("2026-12-12T10:30:00+05:30").getTime();
// 11:30 AM IST: 24-hr Coding begins
const T_CODING_START = new Date("2026-12-12T11:30:00+05:30").getTime();
// 13 Dec 2026:
// 11:30 AM IST: 24-hr Coding ends
const T_CODING_END = new Date("2026-12-13T11:30:00+05:30").getTime();
// 01:00 PM IST: Prize Distribution / Closure concludes
const T_EVENT_CLOSE = new Date("2026-12-13T13:00:00+05:30").getTime();

export function calculateEventCountdownState(nowMs = Date.now()): CountdownStateResult {
  // 1. Before registration
  if (nowMs < T_REGISTRATION_OPEN) {
    const diff = Math.max(0, T_REGISTRATION_OPEN - nowMs);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      status: "BEFORE_REGISTRATION",
      statusBadge: "MISSION COUNTDOWN // IST (ASIA/KOLKATA)",
      statusHeadline: "THE MISSION BEGINS IN",
      days,
      hours,
      minutes,
      seconds,
      isCountdownActive: true,
      targetDescription: "Until check-in & registration opens at JCET Hubballi",
    };
  }

  // 2. 09:30 AM – 10:30 AM, 12 DECEMBER
  if (nowMs >= T_REGISTRATION_OPEN && nowMs < T_REGISTRATION_CLOSE) {
    return {
      status: "REGISTRATION_OPEN",
      statusBadge: "CAMPUS LIVE // CHECK-IN ACTIVE",
      statusHeadline: "REGISTRATION OPEN",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCountdownActive: false,
      targetDescription: "Participant verification & station allotment in progress",
    };
  }

  // 3. Between 10:30 AM and 11:30 AM (Pre-sprint standby)
  if (nowMs >= T_REGISTRATION_CLOSE && nowMs < T_CODING_START) {
    const diff = Math.max(0, T_CODING_START - nowMs);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {
      status: "BEFORE_REGISTRATION",
      statusBadge: "KICKOFF STANDBY // ARENA PREP",
      statusHeadline: "CODING BEGINS IN",
      days: 0,
      hours: 0,
      minutes,
      seconds,
      isCountdownActive: true,
      targetDescription: "24-hour sprint commences at 11:30 AM IST",
    };
  }

  // 4. 11:30 AM, 12 DECEMBER – 11:30 AM, 13 DECEMBER
  if (nowMs >= T_CODING_START && nowMs < T_CODING_END) {
    const diff = Math.max(0, T_CODING_END - nowMs);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {
      status: "CODING_IN_PROGRESS",
      statusBadge: "ARENA SPRINT // 24-HOUR CLOCK ACTIVE",
      statusHeadline: "24-HOUR CODING IN PROGRESS",
      days: 0,
      hours,
      minutes,
      seconds,
      isCountdownActive: true,
      targetDescription: `${hours}h ${minutes}m remaining before code freeze`,
    };
  }

  // 5. AFTER 11:30 AM, 13 DECEMBER – UNTIL 1:00 PM, 13 DECEMBER
  if (nowMs >= T_CODING_END && nowMs < T_EVENT_CLOSE) {
    return {
      status: "FINAL_PRESENTATIONS",
      statusBadge: "CODE FREEZE // JURY EVALUATION",
      statusHeadline: "FINAL PRESENTATIONS / PRIZE DISTRIBUTION",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCountdownActive: false,
      targetDescription: "Jury review and podium prize distribution on main stage",
    };
  }

  // 6. AFTER 1:00 PM, 13 DECEMBER
  return {
    status: "EVENT_COMPLETED",
    statusBadge: "EDITION CONCLUDED // VICTORY",
    statusHeadline: "HACKIGNITE 1.0 COMPLETED",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCountdownActive: false,
    targetDescription: "Thank you to all participating teams, mentors, and innovators",
  };
}

