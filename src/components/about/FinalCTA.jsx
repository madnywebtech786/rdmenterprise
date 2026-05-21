"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const contactItems = [
  { icon: Phone,  text: "+1 (825) 583-5070"        },
  { icon: Mail,   text: "info@rdmenterprise.ca"   },
  { icon: MapPin, text: "Calgary, AB & Surrounding" },
];

export default memo(function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-bg overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0D1D46 0%, #1a2f6b 50%, #0D1D46 100%)" }}
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          <div className="relative px-10 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15
                               bg-white/8 font-body font-600 text-xs tracking-widest uppercase text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Ready to Get Started?
              </span>
            </motion.div>

            <div className="overflow-hidden mb-5">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-4xl md:text-5xl text-white leading-tight"
              >
                Let's Get Your{" "}
                <span style={{ color: "#DF5B10" }}>Job Done</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="font-body text-white/50 text-lg max-w-lg mx-auto mb-10"
            >
              Free quotes, same-day availability, and a crew that genuinely cares.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.48 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-white
                           font-heading font-700 text-sm tracking-wide hover:bg-secondary-light transition-all duration-300
                           shadow-[0_8px_32px_rgba(223,91,16,0.45)] hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={16} />
              </a>
              <a
                href="tel:+16471234567"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20
                           text-white font-heading font-700 text-sm tracking-wide hover:bg-white/18 transition-all duration-300"
              >
                <Phone size={16} /> Call Us Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10 text-sm font-body text-white/35"
            >
              {contactItems.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 hover:text-white/60 transition-colors">
                  <Icon size={13} style={{ color: "#DF5B10" }} />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
