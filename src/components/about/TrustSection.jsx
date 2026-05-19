"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { trustPoints } from "./data";

export default memo(function TrustSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">Why Trust RDM</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
            >
              Your Peace of{" "}
              <span style={{ color: "#DF5B10" }}>Mind</span>
              {" "}Matters
            </motion.h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="card-shimmer flex gap-4 p-6 rounded-2xl bg-white border border-[#e8e4dd]
                           hover:shadow-[0_8px_32px_rgba(13,29,70,0.1)] transition-shadow duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0
                                group-hover:bg-secondary group-hover:scale-105 transition-all duration-300">
                  <Icon size={18} className="text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-heading font-800 text-[#0D1D46] text-base mb-1">{p.title}</h4>
                  <p className="font-body text-[#0D1D46]/55 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
