"use client";

import { memo, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { values } from "./data";

const ValueCard = memo(function ValueCard({ icon: Icon, title, body, color, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rx     = useMotionValue(0);
  const ry     = useMotionValue(0);
  const rotX   = useSpring(rx, { stiffness: 150, damping: 20 });
  const rotY   = useSpring(ry, { stiffness: 150, damping: 20 });

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top)  / r.height - 0.5) *  12);
    ry.set(((e.clientX - r.left) / r.width  - 0.5) * -12);
  }, [rx, ry]);

  const onLeave = useCallback(() => { rx.set(0); ry.set(0); }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 700 }}
      className="card-shimmer relative p-7 rounded-2xl bg-white border border-[#e8e4dd]
                 shadow-[0_4px_20px_rgba(13,29,70,0.06)] hover:shadow-[0_12px_40px_rgba(13,29,70,0.12)]
                 transition-shadow duration-300 group overflow-hidden"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}12` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-heading font-800 text-lg text-[#0D1D46] mb-2">{title}</h3>
      <p className="font-body text-sm text-[#0D1D46]/60 leading-relaxed">{body}</p>
      <div
        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20
                   transition-opacity duration-300 blur-xl pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
});

export default memo(function ValuesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">What We Stand For</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
            >
              Our Core{" "}
              <span style={{ color: "#DF5B10" }}>Values</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/55 text-lg max-w-xl mx-auto mt-4"
          >
            These aren't words on a wall — they're the standard we hold ourselves to on every job.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <ValueCard key={v.title} {...v} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
});
