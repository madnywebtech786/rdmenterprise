"use client";

import { memo, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { servicesExtended } from "./data";

export default memo(function ServicesOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const svc = servicesExtended[active];

  const handleTabClick = useCallback((i) => setActive(i), []);
  const handleDotClick = useCallback((i) => setActive(i), []);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="dot-badge mb-5 inline-flex">What We Do</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] leading-tight"
              >
                Every Service You <span style={{ color: "#DF5B10" }}>Need</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/50 text-base max-w-xs md:text-right leading-relaxed pb-1"
          >
            Six services. One crew. Zero hassle.
          </motion.p>
        </div>

        {/* Tab strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {servicesExtended.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <button
                key={s.label}
                onClick={() => handleTabClick(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border font-heading font-700 text-sm
                             transition-all duration-250
                             ${
                               isActive
                                 ? "bg-[#0D1D46] border-[#0D1D46] text-white shadow-[0_4px_16px_rgba(13,29,70,0.2)]"
                                 : "bg-transparent border-[#e8e4dd] text-[#0D1D46]/50 hover:border-[#0D1D46]/30 hover:text-[#0D1D46]"
                             }`}
              >
                <Icon size={15} className={isActive ? "text-secondary" : ""} />
                {s.label}
              </button>
            );
          })}
        </motion.div>

        {/* Showcase panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="rounded-3xl overflow-hidden border border-[#e8e4dd] shadow-[0_8px_48px_rgba(13,29,70,0.08)]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1fr_480px]"
            >
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-[#f8f7f4]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0D1D46] flex items-center justify-center shadow-md">
                    <svc.icon size={20} className="text-secondary" />
                  </div>
                  <span className="font-body text-sm text-[#0D1D46]/50 italic">
                    {svc.tagline}
                  </span>
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-heading font-900 text-3xl md:text-4xl text-[#0D1D46] mb-4 leading-tight"
                >
                  {svc.label}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="font-body text-[#0D1D46]/60 text-base leading-relaxed mb-8"
                >
                  {svc.desc}
                </motion.p>

                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10"
                >
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 font-body text-sm text-[#0D1D46]/70"
                    >
                      <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={11} style={{ color: "#DF5B10" }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="flex items-center gap-3"
                >
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D1D46] text-white
                               font-heading font-700 text-sm tracking-wide hover:bg-[#1a2f6b] transition-all duration-300
                               shadow-[0_4px_16px_rgba(13,29,70,0.2)] hover:-translate-y-0.5"
                  >
                    Get a Quote <ArrowRight size={14} />
                  </a>
                  <a
                    href="tel:+16471234567"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0D1D46]/20
                               text-[#0D1D46] font-heading font-700 text-sm hover:border-secondary hover:text-secondary
                               transition-all duration-300"
                  >
                    <Phone size={14} /> Call Now
                  </a>
                </motion.div>
              </div>

              <div className="relative hidden lg:block min-h-[440px]">
                <motion.div
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={svc.img}
                    alt={svc.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f4]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-6 bg-[#0D1D46]/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <div className="font-heading font-800 text-white text-sm">
                      {svc.label}
                    </div>
                    <div className="font-body text-white/50 text-xs mt-0.5">
                      RDM enterprise
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center gap-1.5 mt-5">
          {servicesExtended.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? "w-6 h-1.5 bg-[#0D1D46]"
                  : "w-1.5 h-1.5 bg-[#0D1D46]/20 hover:bg-[#0D1D46]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
