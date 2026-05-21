"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ShieldCheck, Zap, HeartHandshake,
  Clock4, BadgeCheck, Headphones,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Fully Licensed and Insured",
    desc: <>Every job is covered. Your belongings are <strong className="text-white/80">protected from pick-up to drop-off.</strong></>,
    stat: "100%", statLabel: "Insured",
  },
  {
    icon: Zap,
    title: "Fast and On-Time",
    desc: <>We respect your schedule. <strong className="text-white/80">Same-day and next-day</strong> options always available.</>,
    stat: "2hr", statLabel: "Avg ETA",
  },
  {
    icon: HeartHandshake,
    title: "Careful Handling",
    desc: <>We treat your items like our own. <strong className="text-white/80">Wrapped, secured, handled with care.</strong></>,
    stat: "0", statLabel: "Damage Claims",
  },
  {
    icon: Clock4,
    title: "Flexible Scheduling",
    desc: <>Book <strong className="text-white/80">morning, evening, or weekend</strong> slots. We work around your life.</>,
    stat: "7d", statLabel: "Per Week",
  },
  {
    icon: BadgeCheck,
    title: "Vetted Professionals",
    desc: <><strong className="text-white/80">Background-checked, trained, and uniformed</strong> team members on every job.</>,
    stat: "50+", statLabel: "Team Members",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: <>Questions before, during, or after? <strong className="text-white/80">Our team is always reachable.</strong></>,
    stat: "24/7", statLabel: "Available",
  },
];

const proofData = [
  { val: "5K+",  label: "Jobs Completed" },
  { val: "98%",  label: "On-Time Rate" },
  { val: "500+", label: "5-Star Reviews" },
  { val: "100%", label: "Satisfaction Rate" },
];

/* 3-D tilt card — tracks mouse via MotionValues */
function BentoCard({ reason, index, inView }) {
  const Icon = reason.icon;
  const ref  = useRef(null);

  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]),  { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]),  { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.2 + index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 600 }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-6
                 hover:bg-white/7 hover:border-[#DF5B10]/30 transition-colors duration-300 cursor-default"
    >
      {/* Number watermark */}
      <div className="absolute top-3 right-4 font-heading font-900 text-6xl text-white/3 leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(223,91,16,0.12) 0%, transparent 70%)" }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                     bg-[#DF5B10]/12 border border-[#DF5B10]/20
                     group-hover:bg-[#DF5B10] group-hover:border-[#DF5B10] group-hover:shadow-[0_4px_16px_rgba(223,91,16,0.4)]"
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
        >
          <Icon
            size={19}
            className="transition-colors duration-300 text-[#DF5B10] group-hover:text-white"
          />
        </motion.div>
        <div className="text-right">
          <div className="font-heading font-900 text-2xl text-white leading-none">{reason.stat}</div>
          <div className="font-body text-[10px] text-white/35 mt-0.5">{reason.statLabel}</div>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-heading font-800 text-base text-white mb-2 leading-snug">
        {reason.title}
      </h4>

      {/* Desc */}
      <p className="font-body text-sm text-white/45 leading-relaxed">
        {reason.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5
                   bg-gradient-to-r from-transparent via-[#DF5B10] to-transparent
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"
      />
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="section-padding overflow-hidden relative bg-[#0D1D46]">

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#DF5B10]/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#DF5B10]/4 blur-[80px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span
              className="dot-badge mb-5 inline-flex"
              style={{ color: "#DF5B10", borderColor: "rgba(223,91,16,0.3)", backgroundColor: "rgba(223,91,16,0.1)" }}
            >
              Why Choose RDM
            </span>
          </motion.div>

          {/* Headline with staggered word reveal */}
          <div className="mb-4 overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-6xl text-white leading-tight"
            >
              The{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 15 }}
                style={{ color: "#DF5B10", display: "inline-block" }}
              >
                RDM
              </motion.span>
              {" "}Difference
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-white/45 text-lg max-w-lg mx-auto"
          >
            We're not just movers. We're a team obsessed with doing every job right the first time.
          </motion.p>
        </div>

        {/* Bento card grid with 3-D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <BentoCard key={reason.title} reason={reason} index={i} inView={inView} />
          ))}
        </div>

        {/* Proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8"
        >
          {proofData.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.07 }}
              className="flex flex-col items-center justify-center py-7 px-4 bg-white/3 text-center
                         hover:bg-white/6 transition-colors duration-300 group"
            >
              <div className="font-heading font-900 text-3xl text-white leading-none mb-1.5
                              group-hover:text-[#DF5B10] transition-colors duration-300">
                {item.val}
              </div>
              <div className="font-body text-xs text-white/35">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
