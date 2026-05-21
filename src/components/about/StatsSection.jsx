"use client";

import { memo, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { stats } from "./data";

const Counter = memo(function Counter({ value, suffix, label, icon: Icon, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const raw    = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 50, damping: 18, restDelta: 0.5 });
  const disp   = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => { if (inView) raw.set(value); }, [inView, value, raw]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-shimmer relative flex flex-col items-center gap-3 p-8 rounded-2xl bg-white
                 border border-[#e8e4dd] shadow-[0_4px_24px_rgba(13,29,70,0.06)]
                 hover:shadow-[0_12px_40px_rgba(13,29,70,0.12)] transition-shadow duration-300 group overflow-hidden"
    >
      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center
                      group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
        <Icon size={20}  className="text-secondary group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="font-heading font-900 text-5xl leading-none" style={{ color: "#DF5B10" }}>
        <motion.span>{disp}</motion.span>{suffix}
      </div>
      <div className="font-body text-sm text-[#0D1D46]/60 text-center leading-snug">{label}</div>
    </motion.div>
  );
});

export default memo(function StatsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">By the Numbers</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
            >
              The Numbers{" "}
              <span style={{ color: "#DF5B10" }}>Speak for Us</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Counter key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
});
