"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";

const STEPS = [
  { n: "01", label: "Get a Quote", body: "Call, WhatsApp, or fill the form. Free, no obligation, within 2 hours." },
  { n: "02", label: "Book a Time", body: "Pick a date and slot. Same-day often available." },
  { n: "03", label: "We Show Up",  body: "Uniformed crew arrives on time with all equipment." },
  { n: "04", label: "Job Done",    body: "We finish to your satisfaction. You review, we leave happy." },
];

export default memo(function HowItWorksStrip({ serviceName }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">Simple Process</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
            >
              How to Book{" "}
              <span style={{ color: "#DF5B10" }}>{serviceName}</span>
            </motion.h2>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col gap-0 lg:hidden">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5 relative"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-[#0D1D46] flex items-center justify-center
                                shadow-[0_4px_16px_rgba(13,29,70,0.2)] z-10 shrink-0">
                  <span className="font-heading font-900 text-sm text-[#DF5B10]">{s.n}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-px flex-1 bg-[#e8e4dd] my-1" />}
              </div>
              <div className={i === STEPS.length - 1 ? "" : "pb-8"}>
                <h4 className="font-heading font-800 text-[#0D1D46] text-lg mb-1">{s.label}</h4>
                <p className="font-body text-[#0D1D46]/55 text-sm leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal row */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center gap-4"
            >
              {i < STEPS.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-[#e8e4dd]" />
              )}
              <div className="w-12 h-12 rounded-2xl bg-[#0D1D46] flex items-center justify-center
                              shadow-[0_4px_16px_rgba(13,29,70,0.2)] shrink-0 z-10">
                <span className="font-heading font-900 text-sm text-[#DF5B10]">{s.n}</span>
              </div>
              <div>
                <h4 className="font-heading font-800 text-[#0D1D46] text-lg mb-1">{s.label}</h4>
                <p className="font-body text-[#0D1D46]/55 text-sm leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
