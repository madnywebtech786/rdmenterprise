"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services, ICON_MAP } from "@/data/services";

const CYCLE_DURATION = 6000;

function ServicePanel({ service, isActive, onClick, progress }) {
  const Icon = ICON_MAP[service.icon];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left group relative flex items-center gap-4 px-5 py-5 rounded-2xl border
                  transition-all duration-300 flex-1 ${
        isActive
          ? "bg-[#0D1D46] border-[#DF5B10]/40 shadow-[0_4px_24px_rgba(13,29,70,0.2)]"
          : "bg-white border-[#e8e4dd] hover:border-[#0D1D46]/20 hover:bg-[#f8f7f4]"
      }`}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
        isActive ? "bg-[#DF5B10] shadow-[0_4px_16px_rgba(223,91,16,0.4)]" : "bg-[#f0ede8] group-hover:bg-[#DF5B10]/10"
      }`}>
        <Icon size={20} className={isActive ? "text-white" : "text-[#DF5B10]"} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className={`font-heading font-800 text-xl leading-tight ${isActive ? "text-white" : "text-[#0D1D46]"}`}>
          {service.title}
        </div>
        <div className={`font-body text-base mt-1 ${isActive ? "text-white/45" : "text-[#0D1D46]/40"}`}>
          {service.subtitle}
        </div>
      </div>

      {/* Number + arrow */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`font-heading font-900 text-sm tracking-widest ${isActive ? "text-[#DF5B10]" : "text-[#0D1D46]/20"}`}>
          {service.num}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive ? "bg-[#DF5B10]/20" : "bg-[#f0ede8] group-hover:bg-[#DF5B10]/10"
        }`}>
          <ArrowUpRight size={13} className={`transition-all duration-300 ${
            isActive ? "text-[#DF5B10]" : "text-[#0D1D46]/30 -rotate-45 group-hover:rotate-0 group-hover:text-[#DF5B10]"
          }`} />
        </div>
      </div>

      {/* Active left border */}
      {isActive && <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#DF5B10]" />}

      {/* Progress bar at bottom */}
      {isActive && (
        <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#DF5B10]/15 overflow-hidden">
          <motion.div
            className="h-full bg-[#DF5B10] rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
            key={service.id}
            style={{ transformOrigin: "left" }}
          />
        </div>
      )}
    </button>
  );
}

/* Feature chip with staggered reveal */
function FeatureChip({ f, i, active }) {
  return (
    <motion.div
      key={`${active}-${f}`}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f7f4] border border-[#e8e4dd]"
    >
      <CheckCircle2 size={12} style={{ color: "#DF5B10" }} />
      <span className="font-body text-xs text-[#0D1D46]/70">{f}</span>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const current = services[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, CYCLE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="services" className="section-padding bg-[#f8f7f4] overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 80% 20%, rgba(223,91,16,0.04) 0%, transparent 60%)` }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-5 inline-flex">What We Do</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] leading-tight"
            >
              Complete{" "}
              <span style={{ color: "#DF5B10" }}>Logistics</span>
              <br />Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-[#0D1D46]/55 text-base max-w-xs leading-relaxed"
            >
              From quick deliveries to full-scale office relocations. One company, every job.
            </motion.p>
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-2 mb-4"
          >
            {services.map((s, i) => {
              const Icon = ICON_MAP[s.icon];
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`relative flex flex-col items-center gap-2 px-3 py-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-[#0D1D46] border-[#DF5B10]/40 shadow-[0_4px_20px_rgba(13,29,70,0.18)]"
                      : "bg-white border-[#e8e4dd] hover:border-[#0D1D46]/20"
                  }`}
                >
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#DF5B10]/30 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#DF5B10] rounded-full"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                        key={active}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  )}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-[#DF5B10] shadow-[0_4px_12px_rgba(223,91,16,0.4)]" : "bg-[#f0ede8]"
                  }`}>
                    <Icon size={16} className={isActive ? "text-white" : "text-[#DF5B10]"} />
                  </div>
                  <div className="text-center">
                    <div className={`font-heading font-800 text-xs leading-tight ${isActive ? "text-white" : "text-[#0D1D46]"}`}>{s.title}</div>
                    <div className={`font-body text-[10px] mt-0.5 ${isActive ? "text-white/40" : "text-[#0D1D46]/35"}`}>{s.subtitle}</div>
                  </div>
                  <span className={`font-heading font-900 text-[10px] tracking-widest ${isActive ? "text-[#DF5B10]" : "text-[#0D1D46]/20"}`}>{s.num}</span>
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden bg-white border border-[#e8e4dd] shadow-[0_8px_40px_rgba(13,29,70,0.08)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover animate-ken-burns"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/70 via-[#0D1D46]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 flex items-end justify-between w-full">
                  <div>
                    <div className="font-heading font-900 text-2xl text-white">{current.title}</div>
                    <div className="font-body text-xs text-white/60 mt-0.5">{current.subtitle}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: current.accent }}>
                    {(() => { const CIcon = ICON_MAP[current.icon]; return <CIcon size={18} className="text-white" />; })()}
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <p className="font-body text-[#0D1D46]/65 text-sm leading-relaxed">{current.descriptionShort}</p>
                {current.sub && (
                  <div className="flex gap-2">
                    {current.sub.map((s) => {
                      const SubIcon = ICON_MAP[s.icon];
                      return (
                        <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8f7f4] border border-[#e8e4dd] flex-1">
                          <SubIcon size={12} style={{ color: "#DF5B10" }} />
                          <span className="font-heading font-700 text-xs text-[#0D1D46]">{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {current.features.map((f, i) => (
                    <FeatureChip key={f} f={f} i={i} active={active} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href="#contact" className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#0D1D46] text-white font-heading font-700 text-sm tracking-wide hover:bg-[#1a2f6b] transition-all shadow-[0_4px_16px_rgba(13,29,70,0.25)]">
                    Book Now
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a href={`/services/${current.id}`} className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#0D1D46]/20 text-[#0D1D46] font-heading font-700 text-sm hover:border-[#DF5B10] hover:text-[#DF5B10] transition-all">
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="hidden lg:grid lg:grid-cols-5 gap-6 items-stretch"
        >
          {/* Left panel list */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            {services.map((s, i) => (
              <ServicePanel
                key={s.id}
                service={s}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* Right detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 rounded-3xl overflow-hidden bg-white border border-[#e8e4dd]
                         shadow-[0_8px_40px_rgba(13,29,70,0.08)] flex flex-col"
            >
              {/* Image with Ken Burns */}
              <div className="relative h-64 md:h-72 overflow-hidden shrink-0">
                <motion.div
                  key={`img-${active}`}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                    sizes="60vw"
                    priority={active === 0}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/70 via-[#0D1D46]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    <div className="font-heading font-900 text-3xl text-white">{current.title}</div>
                    <div className="font-body text-sm text-white/60 mt-0.5">{current.subtitle}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 18 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: current.accent }}
                  >
                    {(() => { const CIcon = ICON_MAP[current.icon]; return <CIcon size={24} className="text-white" />; })()}
                  </motion.div>
                </div>
                <div className="absolute top-5 right-6 font-heading font-900 text-8xl text-white/5 leading-none select-none">
                  {current.num}
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                  className="font-body text-[#0D1D46]/65 leading-relaxed mb-6 text-[15px]"
                >
                  {current.descriptionShort}
                </motion.p>

                {current.sub && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="flex gap-3 mb-6"
                  >
                    {current.sub.map((s) => {
                      const SubIcon = ICON_MAP[s.icon];
                      return (
                        <div key={s.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#f8f7f4] border border-[#e8e4dd] flex-1">
                          <SubIcon size={14} style={{ color: "#DF5B10" }} />
                          <span className="font-heading font-700 text-xs text-[#0D1D46]">{s.label}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {current.features.map((f, i) => (
                    <FeatureChip key={f} f={f} i={i} active={active} />
                  ))}
                </div>

                <div className="mt-auto flex gap-3">
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0D1D46] text-white
                               font-heading font-700 text-sm tracking-wide hover:bg-[#1a2f6b] transition-all duration-300
                               hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(13,29,70,0.25)]"
                  >
                    Book Now
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                  <motion.a
                    href={`/services/${current.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 }}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#0D1D46]/20
                               text-[#0D1D46] font-heading font-700 text-sm hover:border-[#DF5B10] hover:text-[#DF5B10]
                               transition-all duration-300"
                  >
                    Learn More
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 relative overflow-hidden rounded-2xl bg-[#0D1D46] px-8 py-6
                     flex flex-col sm:flex-row items-center justify-between gap-4 group"
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
          />
          {/* Sweep shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          <div className="relative z-10">
            <span className="font-heading font-800 text-white text-lg">Not sure which service fits?</span>
            <span className="font-body text-white/45 text-sm ml-3">We'll help you figure it out.</span>
          </div>
          <a
            href="#contact"
            className="relative z-10 shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DF5B10] text-white
                       font-heading font-700 text-sm hover:bg-[#f06d20] transition-all shadow-[0_4px_20px_rgba(223,91,16,0.4)]
                       hover:-translate-y-0.5"
          >
            Talk to Us <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
