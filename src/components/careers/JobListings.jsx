"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Clock, CheckCircle2 } from "lucide-react";
import { JOBS } from "@/data/jobs";

function JobCard({ job, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const Icon = job.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl border border-surface-2 overflow-hidden
                 shadow-[0_2px_16px_rgba(13,29,70,0.06)]
                 hover:shadow-[0_12px_40px_rgba(13,29,70,0.12)] transition-all duration-300"
    >
      {/* Accent stripe */}
      <div className="h-1 w-full bg-linear-to-r from-secondary via-secondary-light to-secondary/40" />

      <div className="p-6 lg:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-secondary/8 flex items-center justify-center shrink-0
                            group-hover:bg-secondary group-hover:shadow-[0_4px_16px_rgba(223,91,16,0.35)]
                            transition-all duration-300">
              <Icon size={20} className="text-secondary group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-heading font-800 text-lg text-[#0D1D46] leading-tight mb-1">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-white font-body text-[10px] font-600 uppercase tracking-wider ${job.badgeColor}`}>
                  {job.badge}
                </span>
                <span className="flex items-center gap-1 font-body text-xs text-[#0D1D46]/45">
                  <Clock size={10} /> {job.type}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Summary */}
        <p className="font-body text-sm text-[#0D1D46]/60 leading-relaxed mb-4">
          {job.summary}
        </p>

        {/* Expand toggle on mobile — sits right below summary */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="lg:hidden inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full
                     border border-surface-2 bg-bg font-body text-xs font-600 text-[#0D1D46]/60
                     hover:border-secondary hover:text-secondary transition-all duration-200"
        >
          {expanded
            ? <><ChevronUp size={12} /> Show Less</>
            : <><ChevronDown size={12} /> Show Details</>}
        </button>

        {/* Expanded detail */}
        <div className={`${expanded ? "block" : "hidden"} lg:block`}>
          <p className="font-body text-sm text-[#0D1D46]/55 leading-relaxed mb-5">
            {job.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="font-heading font-700 text-xs text-[#0D1D46]/40 uppercase tracking-wider mb-3">
                What You'll Do
              </p>
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-secondary shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-[#0D1D46]/60 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-700 text-xs text-[#0D1D46]/40 uppercase tracking-wider mb-3">
                What We're Looking For
              </p>
              <ul className="flex flex-col gap-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-secondary shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-[#0D1D46]/60 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="flex items-center justify-end pt-5 border-t border-surface-2/60">
          <div>
            <a
              href={`/careers/apply?job=${encodeURIComponent(job.id)}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-white
                         font-heading font-700 text-sm tracking-wide
                         hover:bg-secondary-light hover:shadow-[0_6px_20px_rgba(223,91,16,0.4)]
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              Apply Now <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function JobListings() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="openings" className="section-padding bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">Open Positions</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] mb-4"
            >
              Find Your <span style={{ color: "#DF5B10" }}>Role</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/55 text-lg max-w-lg mx-auto"
          >
            {JOBS.length} positions open across Calgary and surrounding area.
            Click any role to see the full details.
          </motion.p>
        </div>

        {/* Job grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {JOBS.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-[#0D1D46]/45">
            Don't see the right fit?{" "}
            <a href="mailto:info@rdmenterprise.ca" className="text-secondary font-600 hover:underline">
              Email us your resume
            </a>{" "}
            and we'll keep you in mind.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
