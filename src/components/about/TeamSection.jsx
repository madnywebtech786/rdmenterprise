"use client";

import { memo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { team } from "./data";

const TeamCard = memo(function TeamCard({ member, delay }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group overflow-hidden rounded-2xl bg-white border border-[#e8e4dd]
                 shadow-[0_4px_24px_rgba(13,29,70,0.06)] hover:shadow-[0_16px_48px_rgba(13,29,70,0.14)]
                 transition-shadow duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.img} alt={member.name} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/80 via-[#0D1D46]/20 to-transparent" />

        {member.star && (
          <div className="absolute top-4 right-4 bg-secondary text-white rounded-full px-3 py-1
                          font-heading font-700 text-xs tracking-wide shadow-lg">
            Founder
          </div>
        )}

        <motion.div
          animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 p-5"
        >
          <p className="font-body text-white/80 text-xs leading-relaxed">{member.bio}</p>
        </motion.div>
      </div>

      <div className="p-5">
        <h4 className="font-heading font-800 text-[#0D1D46] text-base">{member.name}</h4>
        <p className="font-body text-secondary text-xs font-600 mt-0.5">{member.role}</p>
      </div>
    </motion.div>
  );
});

export default memo(function TeamSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">The People Behind the Work</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46]"
            >
              Meet Our{" "}
              <span style={{ color: "#DF5B10" }}>Team</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/55 text-lg max-w-xl mx-auto mt-4"
          >
            Every person on the RDM crew is trained, background-checked, and proud of the work they do.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
});
