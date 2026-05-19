"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "./data";

export default memo(function TestimonialBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  const handleDot = useCallback((i) => setActive(i), []);

  return (
    <section className="section-padding bg-white overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-[#0D1D46] p-12 text-center overflow-hidden"
        >
          <Quote size={80} className="absolute -top-4 -left-4 opacity-5 text-white" />
          <Quote size={80} className="absolute -bottom-4 -right-4 opacity-5 text-white rotate-180" />

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 240, damping: 15 }}
              >
                <Star size={18} fill="#DF5B10" stroke="none" />
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-700 text-white text-xl md:text-2xl leading-relaxed mb-6"
            >
              "{testimonials[active].text}"
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${active}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-heading font-800 text-secondary text-base">{testimonials[active].author}</p>
              <p className="font-body text-white/40 text-sm">{testimonials[active].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className={`rounded-full transition-all duration-300 ${
                  active === i ? "w-8 h-2 bg-secondary" : "w-2 h-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
