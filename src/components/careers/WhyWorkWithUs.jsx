"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { DollarSign, Clock, TrendingUp, Heart, Shield, MapPin } from "lucide-react";

const perks = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    desc: "Compensation is based on role and experience, paid weekly. Tips are yours to keep.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Full-time and part-time shifts available. We work around your life, not the other way around.",
  },
  {
    icon: TrendingUp,
    title: "Real Advancement",
    desc: "Helper to Lead Mover to Driver. We promote from within — your growth is our priority.",
  },
  {
    icon: Heart,
    title: "Team Culture",
    desc: "We're a crew, not a workforce. Crew lunches, shoutouts for great work, and people who have your back.",
  },
  {
    icon: Shield,
    title: "Insured & Safe",
    desc: "All crew are covered on the job. We follow WCB Alberta protocols and prioritize your safety.",
  },
  {
    icon: MapPin,
    title: "Local Work",
    desc: "Work in and around Calgary. No long hauls — you're home every night.",
  },
];

export default function WhyWorkWithUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#0D1D46] relative overflow-hidden">
      {/* Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff10 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">Why RDM</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-white mb-4"
            >
              More Than Just a{" "}
              <span style={{ color: "#DF5B10" }}>Paycheck</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-white/50 text-lg max-w-lg mx-auto"
          >
            We've built a team people actually want to be part of. Here's why.
          </motion.p>
        </div>

        {/* Perks grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6
                           hover:bg-white/8 hover:border-secondary/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center mb-4
                                group-hover:bg-secondary group-hover:shadow-[0_4px_16px_rgba(223,91,16,0.35)]
                                transition-all duration-300">
                  <Icon size={18} className="text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-700 text-base text-white mb-2">{perk.title}</h3>
                <p className="font-body text-sm text-white/45 leading-relaxed">{perk.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 text-center"
        >
          <a
            href="#openings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-white
                       font-heading font-700 text-sm tracking-wide
                       hover:bg-secondary-light hover:shadow-[0_8px_32px_rgba(223,91,16,0.45)]
                       hover:-translate-y-0.5 transition-all duration-300"
          >
            See All Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
