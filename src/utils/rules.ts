export interface RegistrationPayload {
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  college: string;
  trackId: string;
  memberCount: number;
  projectSynopsis: string;
  githubUrl?: string;
  agreedToTerms: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateRegistration(data: Partial<RegistrationPayload>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.teamName || data.teamName.trim().length < 3) {
    errors.teamName = "Team name must be at least 3 characters.";
  }

  if (!data.leadName || data.leadName.trim().length < 2) {
    errors.leadName = "Lead organizer name is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.leadEmail || !emailRegex.test(data.leadEmail)) {
    errors.leadEmail = "Valid email address is required.";
  }

  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
  if (!data.leadPhone || !phoneRegex.test(data.leadPhone.trim())) {
    errors.leadPhone = "Valid contact phone number is required (10-15 digits).";
  }

  if (!data.college || data.college.trim().length < 2) {
    errors.college = "College / Institution name is required.";
  }

  if (!data.trackId) {
    errors.trackId = "Please select a hackathon track.";
  }

  if (typeof data.memberCount !== "number" || data.memberCount < 2 || data.memberCount > 4) {
    errors.memberCount = "Team size must be between 2 and 4 members.";
  }

  if (!data.projectSynopsis || data.projectSynopsis.trim().length < 15) {
    errors.projectSynopsis = "Project synopsis must be at least 15 characters.";
  }

  if (!data.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the HackIgnite Code of Conduct.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateTimeRemaining(targetIsoDate: string, currentTimestamp = Date.now()): CountdownTime {
  const targetTime = new Date(targetIsoDate).getTime();
  const diff = targetTime - currentTimestamp;

  if (diff <= 0 || isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
}
