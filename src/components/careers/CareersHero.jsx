"use client";

import { motion } from "motion/react";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";

const badges = [
  { icon: Users,       label: "Crew-first culture" },
  { icon: TrendingUp,  label: "Real career growth"  },
  { icon: Shield,      label: "Fully insured work"  },
];

export default function CareersHero() {
  return (
    <section className="relative bg-bg overflow-hidden pt-10 pb-0">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle, #0D1D4618 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-100 h-100 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }} className="mb-6"
          >
            <span className="dot-badge">Join the Team</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-5xl md:text-6xl lg:text-[4.25rem] text-[#0D1D46] leading-[1.06]"
            >
              Build Something{" "}
              <span className="relative inline-block" style={{ color: "#DF5B10" }}>
                Real
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M2 6 C25 2, 50 7, 75 3 C100 -1, 112 5, 118 3"
                    stroke="#DF5B10" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
              <br />With Calgary's{" "}
              <span style={{ color: "#DF5B10" }}>Best Crew</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="font-body text-[#0D1D46]/60 text-lg leading-relaxed mb-10 max-w-xl"
          >
            We don't just hire bodies . We build careers. If you're hardworking, reliable, and
            take pride in your work, there's a spot on the RDM enterprise team waiting for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <a
              href="#openings"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0D1D46] text-white
                         font-heading font-700 text-sm tracking-wide hover:bg-primary-light transition-all duration-300
                         shadow-[0_6px_28px_rgba(13,29,70,0.25)] hover:-translate-y-0.5"
            >
              View Open Positions <ArrowRight size={15} />
            </a>
            <a
              href="tel:+18255835070"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#0D1D46]/20
                         text-[#0D1D46] font-heading font-700 text-sm tracking-wide
                         hover:border-secondary hover:text-secondary transition-all duration-300"
            >
              Call Us Directly
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {badges.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-surface-2
                           shadow-[0_2px_12px_rgba(13,29,70,0.07)]"
              >
                <Icon size={13} style={{ color: "#DF5B10" }} />
                <span className="font-body text-xs font-600 text-[#0D1D46]/70">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="relative bg-[#0D1D46] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              ["Flexible", "Shift Options"],
              ["Calgary", "& Surrounding Area"],
              ["Full-Time", "& Part-Time"],
              ["Competitive", "Compensation"],
            ].map(([val, lab]) => (
              <div key={lab} className="flex items-center gap-2.5">
                <span className="font-heading font-900 text-lg" style={{ color: "#DF5B10" }}>{val}</span>
                <span className="font-body text-xs text-white/45">{lab}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
