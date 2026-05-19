"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";

export default memo(function BottomCTA({ svc }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden text-center px-10 py-16"
          style={{ background: "linear-gradient(135deg, #0D1D46 0%, #1a2f6b 60%, #0D1D46 100%)" }}
        >
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#DF5B10]/15 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-15"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15
                               bg-white/8 font-body font-600 text-xs tracking-widest uppercase text-white/55">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF5B10] animate-pulse" />
                Ready to Book?
              </span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-4xl md:text-5xl text-white leading-tight"
              >
                Book Your{" "}
                <span style={{ color: "#DF5B10" }}>{svc.title}</span>
                {" "}Today
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32 }}
              className="font-body text-white/45 text-lg max-w-md mx-auto mb-10"
            >
              Free quote in under 2 hours. Same-day availability on most jobs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#DF5B10] text-white
                           font-heading font-700 text-sm tracking-wide hover:bg-[#f06d20] transition-all duration-300
                           shadow-[0_8px_32px_rgba(223,91,16,0.45)] hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={16} />
              </a>
              <a
                href="tel:+16471234567"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20
                           text-white font-heading font-700 text-sm hover:bg-white/18 transition-all duration-300"
              >
                <Phone size={15} /> Call Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
