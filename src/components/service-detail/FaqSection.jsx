"use client";

import { memo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const FaqItem = memo(function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? "border-[#DF5B10]/30 bg-white shadow-[0_4px_20px_rgba(223,91,16,0.07)]"
             : "border-[#e8e4dd] bg-white hover:border-[#0D1D46]/20"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading font-700 text-[#0D1D46] text-base leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
            open ? "bg-[#DF5B10] text-white" : "bg-[#f0ede8] text-[#0D1D46]"
          }`}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.22 } }}
          >
            <div className="px-6 pb-5">
              <div className="w-full h-px bg-[#f0ede8] mb-4" />
              <p className="font-body text-[#0D1D46]/60 text-sm leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

function FaqHeader() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="text-center mb-12" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
        <span className="dot-badge mb-4 inline-flex">FAQ</span>
      </motion.div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
        >
          Common{" "}
          <span style={{ color: "#DF5B10" }}>Questions</span>
        </motion.h2>
      </div>
    </div>
  );
}

export default memo(function FaqSection({ faqs }) {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <FaqHeader />
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});
