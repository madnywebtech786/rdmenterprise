"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ICON_MAP } from "@/data/services";

const HighlightCard = memo(function HighlightCard({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon   = ICON_MAP[item.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group p-6 rounded-2xl bg-white border border-[#e8e4dd]
                 hover:shadow-[0_8px_32px_rgba(13,29,70,0.1)] hover:border-[#DF5B10]/25
                 transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-[#DF5B10]/10 flex items-center justify-center mb-4
                      group-hover:bg-[#DF5B10] group-hover:scale-105 transition-all duration-300">
        <Icon size={19} className="text-secondary group-hover:text-white transition-colors duration-300" />
      </div>
      <h4 className="font-heading font-800 text-[#0D1D46] text-base mb-1.5">{item.title}</h4>
      <p className="font-body text-[#0D1D46]/55 text-sm leading-relaxed">{item.body}</p>
    </motion.div>
  );
});

function SectionHeader({ serviceName }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="text-center mb-14" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
        <span className="dot-badge mb-4 inline-flex">What's Included</span>
      </motion.div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
        >
          Everything{" "}
          <span style={{ color: "#DF5B10" }}>Covered</span>
        </motion.h2>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="font-body text-[#0D1D46]/55 text-lg max-w-lg mx-auto mt-4"
      >
        Here's what makes our {serviceName.toLowerCase()} service different from the rest.
      </motion.p>
    </div>
  );
}

export default memo(function HighlightsSection({ svc }) {
  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader serviceName={svc.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {svc.highlights.map((h, i) => (
            <HighlightCard key={h.title} item={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});
