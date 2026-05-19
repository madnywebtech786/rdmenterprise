"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, Award, Clock, Shield } from "lucide-react";

const highlights = [
  { icon: Award,        text: "Licensed & fully insured professionals" },
  { icon: Clock,        text: "Same-day and scheduled service options" },
  { icon: Shield,       text: "Careful handling. Your items, our responsibility." },
  { icon: CheckCircle2, text: "Transparent pricing with zero hidden fees" },
];

const counterData = [
  { value: 8,    suffix: "+", label: "Years in Business" },
  { value: 5000, suffix: "+", label: "Deliveries Completed" },
  { value: 500,  suffix: "+", label: "5-Star Reviews" },
];

/* Smooth animated counter using a spring on a MotionValue */
function Counter({ value, suffix, label }) {
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true, margin: "-80px" });
  const raw       = useMotionValue(0);
  const spring    = useSpring(raw, { stiffness: 60, damping: 20, restDelta: 0.5 });
  const displayed = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) raw.set(value);
  }, [inView, value, raw]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-900 text-4xl md:text-5xl leading-none" style={{ color: "#DF5B10" }}>
        <motion.span>{displayed}</motion.span>
        {suffix}
      </div>
      <div className="font-body text-sm text-[#0D1D46]/60 mt-1">{label}</div>
    </div>
  );
}

/* Highlight card with staggered reveal + shimmer hover */
function HighlightCard({ icon: Icon, text, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-shimmer flex items-start gap-3 p-3 rounded-xl bg-[#f8f7f4] border border-[#e8e4dd]
                 hover:border-[#DF5B10]/30 hover:shadow-[0_4px_20px_rgba(223,91,16,0.08)] transition-all duration-300"
    >
      <div className="w-7 h-7 rounded-lg bg-[#DF5B10]/10 flex items-center justify-center shrink-0 mt-0.5
                      group-hover:bg-[#DF5B10] transition-all duration-300">
        <Icon size={14} style={{ color: "#DF5B10" }} />
      </div>
      <span className="font-body text-sm text-[#0D1D46]/80 font-500">{text}</span>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Image column ── */}
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Subtle decorative square behind image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl bg-[#DF5B10]/5 border border-[#DF5B10]/10"
            />

            {/* Main image */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_24px_64px_rgba(13,29,70,0.15)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=900&q=80"
                alt="RDM delivery team"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/40 to-transparent" />

              {/* Overlay scan line */}
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ animation: "aboutScan 5s ease-in-out infinite", top: "40%" }}
              />
            </motion.div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-8 w-52 h-52 rounded-2xl overflow-hidden border-4 border-white
                         shadow-[0_16px_40px_rgba(13,29,70,0.2)] animate-float"
            >
              <Image
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80"
                alt="Moving boxes"
                fill
                loading="lazy"
                className="object-cover"
                sizes="200px"
              />
            </motion.div>

            {/* Award badge top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -15 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-[#DF5B10]/8 border border-[#DF5B10]/15
                         flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-xl bg-[#DF5B10]/12 flex items-center justify-center">
                <Award size={28} style={{ color: "#DF5B10" }} />
              </div>
            </motion.div>

            {/* Satisfaction card top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 right-2 sm:-right-4 bg-[#0D1D46] text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.85 }}
                className="font-heading font-800 text-2xl"
                style={{ color: "#DF5B10" }}
              >
                98%
              </motion.div>
              <div className="font-body text-xs text-white/70 mt-0.5">Client Satisfaction</div>
            </motion.div>
          </motion.div>

          {/* ── Content column ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="dot-badge mb-5 inline-flex">About RDM Enterprises</span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <div className="mb-6">
              {["Built on Trust,", "Driven", "by Reliability"].map((word, wi) => (
                <span key={wi} className="overflow-hidden inline-block">
                  <motion.span
                    className={`inline-block ${wi === 1 ? "font-heading font-900 text-4xl md:text-5xl leading-tight" : "font-heading font-900 text-4xl md:text-5xl leading-tight"}`}
                    style={{ color: wi === 1 ? "#DF5B10" : "#0D1D46" }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.75, delay: 0.25 + wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                    {wi < 2 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-body text-[#0D1D46]/65 text-lg leading-relaxed mb-6"
            >
              RDM Enterprises was founded with one mission: to provide the most
              dependable and professional delivery and moving services in the
              region. From single parcels to entire office relocations, we
              treat every job with the same dedication.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="font-body text-[#0D1D46]/65 leading-relaxed mb-8"
            >
              Our team of trained, background-checked professionals brings
              years of hands-on experience to every move. We use
              industry-leading equipment and techniques to ensure your
              belongings arrive safely, every single time.
            </motion.p>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, i) => (
                <HighlightCard
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  delay={0.5 + i * 0.09}
                />
              ))}
            </div>

            {/* Counter row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e8e4dd]"
            >
              {counterData.map((c) => (
                <Counter key={c.label} {...c} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
