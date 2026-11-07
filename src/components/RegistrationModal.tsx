import React, { useState } from "react";
import { X, CheckCircle, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import { TRACKS, EVENT_DETAILS } from "../data/eventData";
import { validateRegistration, RegistrationPayload } from "../utils/rules";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTrackId?: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  preSelectedTrackId,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState<Partial<RegistrationPayload>>({
    teamName: "",
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    college: "",
    trackId: preSelectedTrackId || "ai-intelligence",
    memberCount: 4,
    projectSynopsis: "",
    githubUrl: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "memberCount") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 2 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateRegistration(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    // Generate deterministic ticket / registration ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const regId = `HACKIGNITE-2026-${randomHex}`;
    setRegistrationId(regId);
    setIsSubmitted(true);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl my-8 rounded-2xl cosmic-glass border border-[#20CFFF]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(32,207,255,0.25)] text-left">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 text-[#9AAFC1] hover:text-white rounded-lg hover:bg-[#07111D] transition-colors"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07111D] border border-[#20CFFF]/30 text-xs font-mono text-[#8DEBFF] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#20CFFF]" />
                <span>OFFICIAL PORTAL // FREE ENTRY</span>
              </div>
              <h2 id="modal-title" className="font-display font-black text-2xl sm:text-3xl text-white">
                REGISTER YOUR TEAM
              </h2>
              <p className="text-xs sm:text-sm text-[#9AAFC1] mt-1">
                Enter your squad roster for {EVENT_DETAILS.name}. Preliminary screening on rolling basis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team Name */}
                <div>
                  <label htmlFor="teamName" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    Team Name *
                  </label>
                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. CyberNovas"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                  />
                  {errors.teamName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.teamName}
                    </p>
                  )}
                </div>

                {/* Team Size */}
                <div>
                  <label htmlFor="memberCount" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    Team Size (2 – 4 Members) *
                  </label>
                  <select
                    id="memberCount"
                    name="memberCount"
                    value={formData.memberCount}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF]"
                  >
                    <option value={2}>2 Members (Minimum)</option>
                    <option value={3}>3 Members</option>
                    <option value={4}>4 Members (Full Squad)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Lead Name */}
                <div>
                  <label htmlFor="leadName" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    Team Lead Full Name *
                  </label>
                  <input
                    id="leadName"
                    name="leadName"
                    type="text"
                    required
                    value={formData.leadName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                  />
                  {errors.leadName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.leadName}
                    </p>
                  )}
                </div>

                {/* Lead Email */}
                <div>
                  <label htmlFor="leadEmail" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    Lead Email Address *
                  </label>
                  <input
                    id="leadEmail"
                    name="leadEmail"
                    type="email"
                    required
                    value={formData.leadEmail}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                  />
                  {errors.leadEmail && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.leadEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label htmlFor="leadPhone" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    id="leadPhone"
                    name="leadPhone"
                    type="tel"
                    required
                    value={formData.leadPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                  />
                  {errors.leadPhone && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.leadPhone}
                    </p>
                  )}
                </div>

                {/* College / Institution */}
                <div>
                  <label htmlFor="college" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                    College / Institution *
                  </label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    required
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Institute name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                  />
                  {errors.college && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.college}
                    </p>
                  )}
                </div>
              </div>

              {/* Track Choice */}
              <div>
                <label htmlFor="trackId" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                  Preferred Hackathon Track *
                </label>
                <select
                  id="trackId"
                  name="trackId"
                  value={formData.trackId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF]"
                >
                  {TRACKS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Synopsis */}
              <div>
                <label htmlFor="projectSynopsis" className="block text-xs font-semibold text-[#8DEBFF] mb-1">
                  Brief Project Concept / Idea Synopsis *
                </label>
                <textarea
                  id="projectSynopsis"
                  name="projectSynopsis"
                  rows={3}
                  required
                  value={formData.projectSynopsis}
                  onChange={handleChange}
                  placeholder="Summarize the core problem you want to solve, target users, and proposed technical architecture (min 15 characters)..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 text-white text-sm focus:outline-none focus:border-[#20CFFF] focus:ring-1 focus:ring-[#20CFFF] placeholder-[#9AAFC1]/40"
                />
                {errors.projectSynopsis && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.projectSynopsis}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  id="agreedToTerms"
                  name="agreedToTerms"
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded bg-[#07111D] border-[#20CFFF]/40 text-[#20CFFF] focus:ring-[#20CFFF]"
                />
                <label htmlFor="agreedToTerms" className="text-xs text-[#9AAFC1] leading-relaxed">
                  I confirm that all team members are active students and agree to abide by the HackIgnite Code of Conduct and author original work during the 24-hour sprint.
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.agreedToTerms}
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg text-xs font-medium text-[#9AAFC1] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#168BFF] to-[#20CFFF] cyan-btn-glow transition-all hover:scale-105 active:scale-95"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation Boarding Pass View */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#20CFFF]/20 border border-[#20CFFF] flex items-center justify-center mx-auto mb-4 text-[#8DEBFF] shadow-[0_0_25px_rgba(32,207,255,0.4)]">
              <CheckCircle className="w-8 h-8 text-[#20CFFF]" />
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              REGISTRATION CONFIRMED
            </h3>
            <p className="text-sm text-[#9AAFC1] max-w-md mx-auto mb-6">
              Welcome aboard, Team <span className="text-white font-bold">{formData.teamName}</span>! Your application for HackIgnite 1.0 has been logged.
            </p>

            {/* Boarding Pass Box */}
            <div className="p-6 rounded-xl bg-[#07111D] border border-[#20CFFF]/40 text-left max-w-lg mx-auto mb-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#20CFFF]/20">
                <span className="text-[10px] font-mono text-[#8DEBFF]">COSMIC BOARDING PASS</span>
                <span className="text-[10px] font-mono text-[#20CFFF] font-bold">VERIFIED SQUAD</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <div className="text-[#9AAFC1] text-[10px]">Team Name</div>
                  <div className="font-bold text-white font-mono">{formData.teamName}</div>
                </div>
                <div>
                  <div className="text-[#9AAFC1] text-[10px]">Team Size</div>
                  <div className="font-bold text-white font-mono">{formData.memberCount} Members</div>
                </div>
                <div>
                  <div className="text-[#9AAFC1] text-[10px]">Track Choice</div>
                  <div className="font-bold text-[#8DEBFF]">
                    {TRACKS.find((t) => t.id === formData.trackId)?.name || formData.trackId}
                  </div>
                </div>
                <div>
                  <div className="text-[#9AAFC1] text-[10px]">Institution</div>
                  <div className="font-bold text-white truncate">{formData.college}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#20CFFF]/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#9AAFC1]">Registration ID</div>
                  <div className="font-mono text-sm font-bold text-[#20CFFF]">{registrationId}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-3 py-1.5 rounded bg-[#0A1724] border border-[#20CFFF]/30 text-xs font-mono text-[#8DEBFF] hover:bg-[#20CFFF]/20 transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="px-8 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#168BFF] to-[#20CFFF] cyan-btn-glow hover:scale-105 transition-all"
            >
              Done & Return to Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
