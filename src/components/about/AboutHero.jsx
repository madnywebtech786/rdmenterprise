"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Star, Shield, ArrowRight, ChevronRight } from "lucide-react";

const heroProof = [
  { value: "8+",    label: "Years Serving Calgary"  },
  { value: "5,000+",label: "Jobs Completed"        },
  { value: "98%",   label: "Client Satisfaction"   },
  { value: "500+",  label: "5-Star Reviews"        },
];

const avatarSrcs = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80",
];

export default memo(function AboutHero() {
  return (
    <section className="relative bg-[#f8f7f4] overflow-hidden pt-28 pb-0">
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle, #0D1D4618 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] pb-16">

          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-6">
              <span className="dot-badge">About RDM Enterprises</span>
            </motion.div>

            <div className="overflow-hidden mb-5">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-5xl md:text-6xl lg:text-[4rem] text-[#0D1D46] leading-[1.08]"
              >
                Calgary's Most{" "}
                <span className="relative inline-block" style={{ color: "#DF5B10" }}>
                  Trusted
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <motion.path
                      d="M2 6 C40 2, 80 7, 120 3 C160 -1, 185 5, 198 3"
                      stroke="#DF5B10" strokeWidth="2.5" strokeLinecap="round" fill="none"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                </span>
                <br />Delivery &amp;{" "}
                <span style={{ color: "#DF5B10" }}>Moving</span> Company
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="font-body text-[#0D1D46]/60 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Founded in 2016 with one truck and one promise. Today we're a full-service
              moving company serving Calgary and surrounding Alberta communities. Licensed, insured, and
              built entirely on word-of-mouth trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0D1D46] text-white
                           font-heading font-700 text-sm tracking-wide hover:bg-[#1a2f6b] transition-all duration-300
                           shadow-[0_6px_28px_rgba(13,29,70,0.25)] hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={15} />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0D1D46]/20
                           text-[#0D1D46] font-heading font-700 text-sm tracking-wide
                           hover:border-secondary hover:text-secondary transition-all duration-300"
              >
                Our Story <ChevronRight size={15} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-3 pt-8 border-t border-[#0D1D46]/10"
            >
              <div className="flex -space-x-2.5">
                {avatarSrcs.map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-[0_2px_8px_rgba(13,29,70,0.15)]">
                    <Image src={src} alt="customer" width={36} height={36} className="object-cover w-full h-full" loading="lazy" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#DF5B10" stroke="none" />)}
                </div>
                <p className="font-body text-xs text-[#0D1D46]/50">
                  Trusted by <strong className="text-[#0D1D46] font-700">5,000+ customers</strong> across Calgary
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: image collage */}
          <motion.div
            initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_32px_80px_rgba(13,29,70,0.18)]"
            >
              <Image
                src="/images/about-page-hero.webp"
                alt="RDM delivery professional at work" fill className="object-cover" sizes="50vw" priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/50 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 220, damping: 16 }}
              className="absolute -top-5 -left-5 bg-[#0D1D46] text-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(13,29,70,0.3)]"
            >
              <div className="font-heading font-900 text-3xl leading-none" style={{ color: "#DF5B10" }}>2016</div>
              <div className="font-body text-xs text-white/60 mt-1">Est. in Calgary</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(13,29,70,0.12)] border border-[#e8e4dd]"
            >
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#DF5B10" stroke="none" />)}
              </div>
              <div className="font-heading font-900 text-2xl text-[#0D1D46] leading-none">98%</div>
              <div className="font-body text-xs text-[#0D1D46]/50 mt-0.5">Client Satisfaction</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.82, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 -translate-y-1/2 -right-5 bg-secondary text-white rounded-2xl p-4
                         shadow-[0_8px_32px_rgba(223,91,16,0.4)] flex flex-col items-center gap-1"
            >
              <Shield size={20} className="text-white" />
              <div className="font-heading font-800 text-xs text-center leading-tight">Fully<br />Insured</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stat bar */}
      <div className="relative bg-[#0D1D46] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {heroProof.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="px-6 first:pl-0 last:pr-0 flex flex-col items-center text-center py-2"
              >
                <span className="font-heading font-900 text-2xl" style={{ color: "#DF5B10" }}>{p.value}</span>
                <span className="font-body text-xs text-white/45 mt-0.5">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
