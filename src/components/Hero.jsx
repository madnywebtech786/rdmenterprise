"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Star, TruckIcon, Zap } from "lucide-react";

const stats = [
  { value: "5K+", label: "Deliveries Done" },
  { value: "98%", label: "Happy Clients" },
  { value: "3K+", label: "Items Moved" },
  { value: "50+", label: "Team Members" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1D46]"
    >
      {/* ── Animated grid lines ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Orange radial glow behind image — desktop only (GPU heavy) ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#DF5B10]/12 blur-[120px] pointer-events-none z-0 hidden lg:block" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#DF5B10]/8 blur-[80px] pointer-events-none z-0 hidden lg:block" />

      {/* ── Scanning line ── */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DF5B10]/40 to-transparent z-10 pointer-events-none"
        style={{ animation: "scanline 6s linear infinite", top: "30%" }}
      />

      {/* ── Diagonal slash accent ── */}
      <div className="absolute inset-y-0 right-[38%] w-px bg-gradient-to-b from-transparent via-[#DF5B10]/20 to-transparent z-10 hidden lg:block" />

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center min-h-screen">

        {/* LEFT — Copy */}
        <motion.div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DF5B10]/30 bg-[#DF5B10]/8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DF5B10] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DF5B10]" />
              </span>
              <span className="font-heading font-700 text-[#DF5B10] text-xs tracking-widest uppercase">GTA's Trusted Movers</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#DF5B10] text-[#DF5B10]" />)}
              <span className="font-body text-white/40 text-xs ml-1">500+ reviews</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-heading font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-white">
                We Move
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-heading font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]"
                style={{ color: "#DF5B10", WebkitTextStroke: "0px" }}>
                Anything,
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-heading font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-white">
                Anywhere.
              </h1>
            </motion.div>
          </div>

          {/* Descriptor line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-body text-white/55 text-base md:text-lg leading-relaxed max-w-md mb-10"
          >
            From <strong className="text-white/80 font-700">same-day delivery</strong> to <strong className="text-white/80 font-700">full office relocations</strong> — RDM Enterprises
            delivers with <strong className="text-white/80 font-700">precision, care, and speed</strong> you can count on.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <a
              href="#contact"
              className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#DF5B10] text-white font-heading font-700 text-sm tracking-wide overflow-hidden transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" />
              <Zap size={15} />
              Get a Free Quote
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white font-heading font-700 text-sm tracking-wide hover:bg-white/6 hover:border-white/30 transition-all duration-300"
            >
              Our Services
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="grid grid-cols-2 sm:flex sm:items-center gap-x-0 gap-y-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.07 }}
                className="flex flex-col sm:pr-6 sm:mr-6 sm:border-r border-white/10 sm:last:border-0 sm:last:mr-0 sm:last:pr-0"
              >
                <span className="font-heading font-900 text-2xl text-white leading-none">{s.value}</span>
                <span className="font-body text-xs text-white/40 mt-0.5 whitespace-nowrap">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Hero image with floating UI elements */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Hexagonal clip frame */}
          <div className="relative w-[480px] h-[560px]">

            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-[#DF5B10]/20 animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute -inset-3 rounded-[3rem] border border-white/4" />

            {/* Corner brackets */}
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
            ].map((cls, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className={`absolute w-8 h-8 border-[#DF5B10] ${cls}`}
              />
            ))}

            {/* Main image */}
            <div className="absolute inset-2 rounded-[2rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=85"
                alt="RDM delivery truck"
                fill
                priority
                className="object-cover object-center"
                sizes="480px"
              />
              {/* Dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/60 via-transparent to-[#0D1D46]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1D46]/30 to-transparent" />
            </div>

            {/* HUD scan line on image */}
            <div className="absolute inset-2 rounded-[2rem] overflow-hidden pointer-events-none">
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#DF5B10]/60 to-transparent"
                style={{ animation: "imgScan 4s ease-in-out infinite", top: "40%" }}
              />
            </div>

            {/* Floating card — top left: Live dispatch */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-14 top-16 bg-[#0D1D46]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-44"
              style={{ animation: "floatY 5s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="font-heading font-700 text-white text-xs">LIVE DISPATCH</span>
              </div>
              <div className="font-body text-white/50 text-[10px] leading-relaxed">
                3 trucks active<br />in your area now
              </div>
            </motion.div>

            {/* Floating card — right: rating */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-12 top-1/3 bg-[#DF5B10] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(223,91,16,0.5)] w-36"
              style={{ animation: "floatY 6s ease-in-out infinite", animationDelay: "1.5s" }}
            >
              <div className="font-heading font-900 text-3xl text-white leading-none">4.9</div>
              <div className="flex gap-0.5 my-1.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-white text-white" />)}
              </div>
              <div className="font-body text-white/75 text-[10px]">500+ verified reviews</div>
            </motion.div>

            {/* Floating card — bottom: ETA badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0D1D46]/90 backdrop-blur-xl border border-[#DF5B10]/30 rounded-2xl px-6 py-3.5 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-max"
            >
              <TruckIcon size={20} style={{ color: "#DF5B10" }} />
              <div>
                <div className="font-heading font-700 text-white text-sm">Same-Day Available</div>
                <div className="font-body text-white/45 text-xs">Book before 2 PM</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="font-heading font-900 text-[#DF5B10] text-lg leading-none">2hr<br /><span className="text-white/40 text-xs font-body font-400">ETA</span></div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] text-white/30 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#DF5B10]/60 to-transparent" />
      </motion.div>
    </section>
  );
}
