"use client";

import { memo } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { certifications } from "./data";

const paragraphs = [
  "RDM enterprise was founded in 2016 with a single truck and an unwavering commitment to reliability. What started as a local Calgary moving company has grown into a full-service logistics company trusted by thousands of families and businesses.",
  "We don't just move boxes — we move lives. Whether you're relocating your home, clearing out clutter, or need a last-minute delivery, our team brings professionalism and genuine care to every single job.",
  "Every crew member is background-checked, trained, and held to the same standard we'd want when someone enters our own home.",
];

export default memo(function MissionSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="story" className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div ref={ref} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl border-2 border-secondary/20"
            />
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }} animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_64px_rgba(13,29,70,0.15)]"
            >
              <Image
                src="/images/about-page-side.webp"
                alt="RDM team at work" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1D46]/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }} animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-[#0D1D46] rounded-2xl p-3 sm:p-5 shadow-xl text-white"
            >
              <div className="font-heading font-900 text-3xl" style={{ color: "#DF5B10" }}>98%</div>
              <div className="font-body text-xs text-white/60 mt-0.5">Client Satisfaction</div>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#DF5B10" stroke="none" />)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 15 }} animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 15 }}
              className="absolute -top-3 -right-2 sm:-top-6 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-secondary
                         flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
            >
              <MapPin size={22} className="text-white mb-1" />
              <div className="font-heading font-800 text-white text-xs text-center leading-tight">Calgary<br />Coverage</div>
            </motion.div>
          </motion.div>

          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
              <span className="dot-badge mb-5 inline-flex">Our Mission</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] leading-tight"
              >
                More than a{" "}
                <span style={{ color: "#DF5B10" }}>Delivery Company</span>
              </motion.h2>
            </div>

            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="font-body text-[#0D1D46]/65 leading-relaxed mb-4"
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {certifications.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D1D46]/5 border border-[#0D1D46]/10 font-body text-xs font-600 text-[#0D1D46]/70">
                  <CheckCircle2 size={11} style={{ color: "#DF5B10" }} />
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});
