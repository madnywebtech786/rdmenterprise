"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { processSteps } from "./data";

const ProcessRailItem = memo(function ProcessRailItem({ step, index }) {
  const Icon    = step.icon;
  const itemRef = useRef(null);
  const inView  = useInView(itemRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 pb-12 last:pb-0 group"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                         border-2 transition-all duration-500 shadow-md
                         ${inView
                           ? "bg-[#0D1D46] border-[#0D1D46] shadow-[0_4px_20px_rgba(13,29,70,0.25)]"
                           : "bg-white border-[#e8e4dd]"}`}>
          <Icon size={18} className={inView ? "text-secondary" : "text-[#0D1D46]/30"} />
        </div>
        {index < processSteps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.07 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-px flex-1 mt-2 bg-gradient-to-b from-[#0D1D46]/30 to-[#0D1D46]/05"
            style={{ minHeight: "3rem" }}
          />
        )}
      </div>

      <div className="flex-1 pt-2 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-heading font-900 text-xs text-secondary tracking-widest uppercase">
            Step {step.step}
          </span>
          <div className="h-px flex-1 bg-[#0D1D46]/8" />
        </div>
        <h3 className="font-heading font-800 text-[#0D1D46] text-xl mb-2">{step.title}</h3>
        <p className="font-body text-[#0D1D46]/58 text-sm leading-relaxed mb-3">{step.body}</p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                         bg-secondary/8 border border-secondary/15 font-body text-xs font-600 text-secondary">
          <CheckCircle2 size={11} />
          {step.detail}
        </span>
      </div>
    </motion.div>
  );
});

export default memo(function ProcessSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10 items-end mb-20" ref={ref}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              <span className="dot-badge mb-5 inline-flex">Simple Process</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] leading-tight"
              >
                How It{" "}
                <span style={{ color: "#DF5B10" }}>Works</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/55 text-lg leading-relaxed pb-1"
          >
            From first contact to final review — here's exactly what happens when you book with RDM.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {processSteps.map((step, i) => (
            <ProcessRailItem key={step.step} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6 rounded-2xl bg-[#0D1D46]"
        >
          <div>
            <p className="font-heading font-800 text-white text-lg">Ready to get started?</p>
            <p className="font-body text-white/45 text-sm mt-0.5">Takes less than 2 minutes to get a quote.</p>
          </div>
          <a
            href="/#contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-white
                       font-heading font-700 text-sm tracking-wide hover:bg-secondary-light transition-all duration-300
                       shadow-[0_6px_24px_rgba(223,91,16,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            Get a Free Quote <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
});
