"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ICON_MAP } from "@/data/services";

export default memo(function OtherServices({ allServices, currentId }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const others = allServices.filter((s) => s.id !== currentId);

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">More Services</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-3xl md:text-4xl text-[#0D1D46]"
            >
              We Also{" "}
              <span style={{ color: "#DF5B10" }}>Handle</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {others.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon];
            return (
              <motion.a
                key={svc.id}
                href={`/services/${svc.id}`}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[#e8e4dd]
                           hover:shadow-[0_10px_36px_rgba(13,29,70,0.1)] hover:border-[#0D1D46]/20
                           transition-all duration-300 overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f0ede8] flex items-center justify-center
                                group-hover:bg-[#0D1D46] transition-all duration-300">
                  <Icon size={20} style={{ color: "#DF5B10" }} className="group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-heading font-800 text-[#0D1D46] text-lg mb-1">{svc.title}</div>
                  <div className="font-body text-[#0D1D46]/50 text-sm leading-relaxed">{svc.descriptionShort}</div>
                </div>
                <div className="mt-auto flex items-center gap-1.5 font-heading font-700 text-sm text-[#DF5B10]
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowUpRight size={13} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
});
