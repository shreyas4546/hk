import { GraduationCap, Users } from "lucide-react";
import { ORGANIZERS } from "../data/eventData";

export default function SponsorsOrganizers() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/25 text-xs font-mono text-[#8DEBFF] mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-[#20CFFF]" />
          <span>HOST ACADEMIA & LEADERSHIP</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
          ORGANIZING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">COUNCIL</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AAFC1]">
          Orchestrated by the {ORGANIZERS.department} at {ORGANIZERS.institution} in collaboration with student developer communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Faculty Conveners */}
        <div className="sci-fi-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#20CFFF]/20">
            <GraduationCap className="w-6 h-6 text-[#20CFFF]" />
            <h3 className="font-display font-bold text-lg text-white">Faculty Conveners & Patrons</h3>
          </div>
          <div className="space-y-4">
            {ORGANIZERS.facultyAdvisors.map((advisor) => (
              <div key={advisor.name} className="flex items-center justify-between p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{advisor.name}</div>
                  <div className="text-xs text-[#9AAFC1]">{advisor.role}</div>
                </div>
                <span className="text-[10px] font-mono text-[#20CFFF] px-2 py-0.5 rounded bg-[#20CFFF]/10 border border-[#20CFFF]/30">
                  Advisory
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div className="sci-fi-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#20CFFF]/20">
            <Users className="w-6 h-6 text-[#20CFFF]" />
            <h3 className="font-display font-bold text-lg text-white">Student Core Organizers</h3>
          </div>
          <div className="space-y-4">
            {ORGANIZERS.studentCoordinators.map((student) => (
              <div key={student.name} className="flex items-center justify-between p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{student.name}</div>
                  <div className="text-xs text-[#9AAFC1]">{student.role}</div>
                </div>
                <span className="text-[10px] font-mono text-[#8DEBFF] px-2 py-0.5 rounded bg-[#0A1724] border border-[#20CFFF]/30">
                  Operations
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
