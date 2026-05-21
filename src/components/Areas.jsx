"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const locations = [
  { name: "Calgary",     tag: "Main Hub",    desc: "Downtown to the suburbs. Full coverage across all Calgary communities.",     x: 50, y: 45, major: true  },
  { name: "Airdrie",     tag: "North",       desc: "Just north of Calgary. Fast same-day routes throughout Airdrie.",             x: 50, y: 22, major: true  },
  { name: "Cochrane",    tag: "Northwest",   desc: "Scenic foothill town. Residential and commercial moves covered.",             x: 22, y: 32, major: true  },
  { name: "Chestermere", tag: "East",        desc: "Lakeside community east of Calgary. Pickups and deliveries every day.",       x: 74, y: 45, major: false },
  { name: "Okotoks",     tag: "South",       desc: "Growing south of Calgary. Office moves and deliveries daily.",                x: 50, y: 72, major: false },
  { name: "Strathmore",  tag: "Southeast",   desc: "Wheatland County hub. Serving the prairie corridor and beyond.",             x: 78, y: 62, major: false },
];

const calgaryX = 50;
const calgaryY = 45;

export default function Areas() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="areas" className="section-padding bg-[#0D1D46] overflow-hidden relative">

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-secondary/6 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-5 inline-flex" style={{ color: "#DF5B10", borderColor: "rgba(223,91,16,0.3)", backgroundColor: "rgba(223,91,16,0.1)" }}>
              Service Coverage
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading font-900 text-4xl md:text-6xl text-white leading-tight mb-4"
          >
            We Cover{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.28, type: "spring", stiffness: 180, damping: 14 }}
              style={{ color: "#DF5B10", display: "inline-block" }}
            >
              Calgary & Beyond
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-white/45 text-lg max-w-md mx-auto"
          >
            6 key service zones across Calgary and surrounding Alberta communities, with same-day availability in all locations.
          </motion.p>
        </div>

        {/* Main block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-6 items-stretch"
        >

          {/* ── LEFT: SVG Map ── */}
          <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-white/3 flex flex-col">

            {/* Map header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-secondary opacity-60" />
                  <span className="relative rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <span className="font-heading font-700 text-white/60 text-xs tracking-widest uppercase">Calgary, Alberta</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-body text-white/30">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" />Hub</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full border border-secondary/50 bg-secondary/20" />Zone</span>
              </div>
            </div>

            {/* SVG */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
              <svg viewBox="0 0 100 90" className="w-full max-w-md" fill="none">

                {/* Rocky Mountains silhouette — west */}
                <path
                  d="M 2 60 L 8 46 L 14 52 L 20 38 L 26 44 L 30 35 L 34 42 L 36 60"
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="rgba(255,255,255,0.02)"
                />
                <text x="18" y="68" textAnchor="middle" fontSize="3"
                  fill="rgba(255,255,255,0.15)" fontFamily="Montserrat, sans-serif">Rockies</text>

                {/* Bow River hint */}
                <path
                  d="M 30 42 Q 42 48 50 45 Q 60 42 72 50"
                  stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none" strokeDasharray="3 2"
                />

                {/* Radial glow behind Calgary */}
                <circle cx={calgaryX} cy={calgaryY} r="18" fill="rgba(223,91,16,0.05)" />
                <circle cx={calgaryX} cy={calgaryY} r="10" fill="rgba(223,91,16,0.08)" />

                {/* Connection lines */}
                {locations.filter((_, i) => i !== 0).map((loc, li) => {
                  const locIdx = locations.indexOf(loc);
                  const isActiveConn = active === locIdx;
                  const lineLen = Math.sqrt(Math.pow(loc.x - calgaryX, 2) + Math.pow(loc.y - calgaryY, 2));
                  return (
                    <motion.line
                      key={`line-${loc.name}`}
                      x1={calgaryX} y1={calgaryY}
                      x2={loc.x}    y2={loc.y}
                      stroke={isActiveConn ? "rgba(223,91,16,0.7)" : "rgba(223,91,16,0.18)"}
                      strokeWidth={isActiveConn ? "0.9" : "0.5"}
                      strokeDasharray={`${lineLen} ${lineLen}`}
                      initial={{ strokeDashoffset: lineLen, opacity: 0 }}
                      animate={inView ? { strokeDashoffset: 0, opacity: 1 } : {}}
                      transition={{
                        strokeDashoffset: { duration: 0.9, delay: 0.5 + li * 0.12, ease: "easeOut" },
                        opacity: { duration: 0.3, delay: 0.5 + li * 0.12 },
                      }}
                      style={{ transition: "stroke 0.3s, strokeWidth 0.3s" }}
                    />
                  );
                })}

                {/* Pins */}
                {locations.map((loc, i) => {
                  const isActive = active === i;
                  return (
                    <motion.g
                      key={loc.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 280, damping: 18 }}
                      style={{ transformOrigin: `${loc.x}% ${loc.y}%`, cursor: "pointer" }}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                    >
                      {isActive && (
                        <>
                          <circle cx={loc.x} cy={loc.y} r="10" fill="none" stroke="rgba(223,91,16,0.25)" strokeWidth="0.6">
                            <animate attributeName="r"       from="6"   to="14"  dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0"   dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={loc.x} cy={loc.y} r="7" fill="none" stroke="rgba(223,91,16,0.4)" strokeWidth="0.5">
                            <animate attributeName="r"       from="4"   to="9"   dur="2s" begin="0.4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.6" to="0"   dur="2s" begin="0.4s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}

                      <circle
                        cx={loc.x} cy={loc.y}
                        r={isActive ? (loc.major ? 5.5 : 4) : (loc.major ? 4 : 2.8)}
                        fill={isActive ? "#DF5B10" : loc.major ? "rgba(223,91,16,0.6)" : "rgba(223,91,16,0.3)"}
                        stroke={isActive ? "rgba(255,255,255,0.4)" : "rgba(223,91,16,0.5)"}
                        strokeWidth={isActive ? "1" : "0.6"}
                        style={{ transition: "all 0.25s" }}
                      />

                      {isActive && (
                        <motion.line
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.25 }}
                          x1={loc.x} y1={loc.y + (loc.major ? 5.5 : 4)}
                          x2={loc.x} y2={loc.y + (loc.major ? 9 : 7.5)}
                          stroke="#DF5B10" strokeWidth="1.2" strokeLinecap="round"
                          style={{ transformOrigin: `${loc.x}px ${loc.y + (loc.major ? 5.5 : 4)}px` }}
                        />
                      )}

                      <text
                        x={loc.x}
                        y={loc.y - (isActive ? (loc.major ? 7.5 : 6) : (loc.major ? 6 : 4.5))}
                        textAnchor="middle"
                        fontSize={isActive ? "3.8" : "3"}
                        fill={isActive ? "white" : "rgba(255,255,255,0.5)"}
                        fontFamily="League Spartan, sans-serif"
                        fontWeight={isActive ? "800" : "600"}
                        style={{ transition: "all 0.25s" }}
                      >
                        {loc.name}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 border-t border-white/6">
              {[
                { val: "6",        label: "Zones" },
                { val: "AB",       label: "Province" },
                { val: "Same-Day", label: "Available" },
              ].map((s, i) => (
                <div key={s.label} className={`py-4 text-center ${i < 2 ? "border-r border-white/6" : ""}`}>
                  <div className="font-heading font-900 text-base text-white leading-none">{s.val}</div>
                  <div className="font-body text-[10px] text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Location cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {locations.map((loc, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={loc.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white/8 border-secondary/40 shadow-[0_4px_24px_rgba(223,91,16,0.12)]"
                      : "bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15"
                  }`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-secondary shadow-[0_4px_12px_rgba(223,91,16,0.4)]" : "bg-white/6"
                  }`}>
                    <MapPin size={13} className={isActive ? "text-white" : "text-secondary"} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className={`font-heading font-800 text-sm ${isActive ? "text-white" : "text-white/80"}`}>
                        {loc.name}
                      </span>
                      <span className={`font-body text-[9px] px-1.5 py-0.5 rounded-full border transition-colors ${
                        isActive
                          ? "bg-secondary/20 border-secondary/40 text-secondary"
                          : "bg-white/5 border-white/10 text-white/35"
                      }`}>
                        {loc.tag}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="font-body text-[11px] leading-relaxed text-white/55 hidden sm:block overflow-hidden"
                        >
                          {loc.desc}
                        </motion.p>
                      )}
                      {!isActive && (
                        <p className="font-body text-[11px] leading-relaxed text-white/30 hidden sm:block">
                          {loc.desc}
                        </p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`shrink-0 w-1.5 h-1.5 rounded-full mt-1 transition-all duration-300 ${
                    isActive ? "bg-secondary shadow-[0_0_8px_rgba(223,91,16,0.8)]" : "bg-white/15"
                  }`} />
                </motion.button>
              );
            })}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              className="sm:col-span-2 lg:col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-secondary/20 bg-secondary/6 hover:border-secondary/35 transition-colors duration-300"
            >
              <div>
                <div className="font-heading font-700 text-sm text-white mb-0.5">Don't see your city?</div>
                <div className="font-body text-xs text-white/40">We may still cover your area across Alberta. Just ask.</div>
              </div>
              <a
                href="#contact"
                className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary text-white font-heading font-700 text-xs hover:bg-secondary-light transition-all duration-200 shadow-[0_4px_16px_rgba(223,91,16,0.35)] hover:-translate-y-0.5"
              >
                Ask Us <ArrowUpRight size={12} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
