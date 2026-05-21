"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle2, Star } from "lucide-react";

export default memo(function ServiceHero({ svc }) {
  return (
    <section className="relative bg-[#0D1D46] overflow-hidden pt-28 pb-0 min-h-[70vh] flex flex-col">
      <div className="absolute -top-32 -right-32 w-140 h-140 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-white/3 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-15"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 font-body text-xs text-white/35 mb-6"
            >
              <a href="/" className="hover:text-white/60 transition-colors">Home</a>
              <span>/</span>
              <a href="/#services" className="hover:text-white/60 transition-colors">Services</a>
              {svc.parentId && (
                <>
                  <span>/</span>
                  <a href={`/services/${svc.parentId}`} className="hover:text-white/60 transition-colors">Moving Services</a>
                </>
              )}
              <span>/</span>
              <span className="text-secondary">{svc.title}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15
                               bg-white/8 font-body font-600 text-xs tracking-widest uppercase text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {svc.subtitle}
              </span>
            </motion.div>

            <div className="overflow-hidden mb-5">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-5xl md:text-6xl text-white leading-tight"
              >
                {svc.title.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1
                      ? <span style={{ color: "#DF5B10" }}>{word}</span>
                      : <>{word} </>}
                  </span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="font-body text-white/55 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {svc.descriptionLong}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {svc.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                         bg-white/8 border border-white/12 font-body text-xs text-white/70">
                  <CheckCircle2 size={11} style={{ color: "#DF5B10" }} />
                  {f}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-white
                           font-heading font-700 text-sm tracking-wide hover:bg-secondary-light transition-all duration-300
                           shadow-[0_8px_32px_rgba(223,91,16,0.4)] hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={15} />
              </a>
              <a
                href="tel:+18255835070"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20
                           text-white font-heading font-700 text-sm hover:bg-white/8 transition-all duration-300"
              >
                <Phone size={15} /> Call Now
              </a>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
            >
              <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="50vw" priority />
              <div className="absolute inset-0 bg-linear-to-tr from-[#0D1D46]/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 220, damping: 16 }}
              className="absolute -bottom-5 -left-5 w-20 h-20 rounded-2xl bg-secondary
                         flex items-center justify-center shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
            >
              <span className="font-heading font-900 text-3xl text-white leading-none">{svc.num}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.72, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(13,29,70,0.18)]"
            >
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#DF5B10" stroke="none" />)}
              </div>
              <div className="font-heading font-800 text-[#0D1D46] text-xs">500+ Reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative h-16">
        <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#f8f7f4" />
        </svg>
      </div>
    </section>
  );
});
