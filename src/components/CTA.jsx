"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Phone, ArrowRight, CalendarCheck } from "lucide-react";

export default function CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden bg-[#0D1D46] p-12 md:p-16"
        >
          {/* Static bg decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/10" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-secondary/6" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Animated corner brackets */}
          {[
            "top-5 left-5 border-t-2 border-l-2 rounded-tl-2xl",
            "top-5 right-5 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-5 left-5 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-5 right-5 border-b-2 border-r-2 rounded-br-2xl",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
              className={`absolute w-7 h-7 border-secondary/40 ${cls}`}
            />
          ))}

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Text */}
            <div className="text-center lg:text-left max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/15 border border-secondary/25
                           text-secondary text-xs font-heading font-700 tracking-widest uppercase mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Ready to Move?
              </motion.div>

              {/* Headline — lines drop in */}
              {[
                { text: "Get Your", color: "text-white" },
                { text: "Free Quote", color: "text-secondary" },
                { text: "in Minutes", color: "text-white" },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.75, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-heading font-900 text-4xl md:text-5xl leading-tight ${line.color}`}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 }}
                className="font-body text-white/60 text-lg leading-relaxed mt-4"
              >
                <strong className="text-white/85 font-700">No obligation. No hidden fees.</strong> Just a straight,
                honest price for whatever you need moved, delivered, or removed.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0"
            >
              <a
                href="#contact"
                className="group btn-ripple flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-secondary text-white
                           font-heading font-700 text-base tracking-wide hover:bg-secondary-light transition-all duration-300
                           shadow-[0_8px_32px_rgba(223,91,16,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(223,91,16,0.5)]
                           animate-glow-pulse"
              >
                <CalendarCheck size={18} />
                Book a Service
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+16471234567"
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/25 text-white
                           font-heading font-700 text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300
                           hover:-translate-y-0.5"
              >
                <Phone size={18} className="transition-transform group-hover:scale-110 duration-200" />
                Call Us Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
